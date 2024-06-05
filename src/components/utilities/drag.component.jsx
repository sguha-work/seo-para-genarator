import { useEffect, useRef, useState } from "react";
import { Subject_ShowModal$ } from "../../subjects/modal.behavior-subject";
import {
  Subject_ImageUploaded$,
  Subject_EditInmageByPrompt$,
  Subject_ImageEditedByPrompt$,
} from "../../subjects/image.behavior-subject";
import { ajax } from "rxjs/ajax";
import { map, catchError, of } from "rxjs";
import { SERVER_URL } from "../../constants/common.constant";
import "./drag.component.css";
import Modal from "./model.component";
export default function Drag() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [link, setLink] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [focusKeywords, setFocusKeywords] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const iframe = useRef(null);
  const promptText = useRef(null);
  const input1ImageOldValue = useRef(null);
  const dummyImage1 =
    "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/f68feb16-5925-11ed-83cc-02420a0000c8/Image3.jpg";
  const dummyImage2 =
    "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/fda030fa-f8fc-11ee-9505-02420a00015d/gooey.ai%20-%20colorful%20background%20studio%20ghibli%20ponyo%20anime%20excited%20anime%20saturated%20colors%20color..png";
  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
  const [leftAndRightImageURL, setLeftAndRightImageURL] = useState({
    image1: dummyImage1,
    image2: dummyImage2,
  });
  useEffect(()=>{
    iframe.current.src = 'data:text/html;charset=utf-8,' + encodeURI(generatedContent);
  },[generatedContent]);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleLinkImport = () => {
    console.log("Importing link:", link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      search_query: searchQuery,
      keywords: focusKeywords,
      title: websiteName,
      company_url: websiteURL,
    };

    try {
      Subject_ShowModal$.next(true);
      const response = await fetch(SERVER_URL+"/seo-paragraph-generator/api/seo-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Format the response data to HTML
      const formattedContent = formatResponseData(data);
      setGeneratedContent(formattedContent);
      Subject_ShowModal$.next(false);
    } catch (error) {
      console.error("Error fetching SEO summary:", error);
    }
  };

  const formatResponseData = (data) => {
    if (!data) return "";

    const { created_at, output, serp_results } = data;
    const { output_content } = output;

    let contentHtml = `<p>Created At: ${created_at}</p>`;

    if (output_content && output_content.length > 0) {
      contentHtml += `<div>${output_content.join("")}</div>`;
    }

    if (serp_results) {
      if (serp_results.organic && serp_results.organic.length > 0) {
        contentHtml += `<h3>Organic Results:</h3><ul>`;
        serp_results.organic.forEach(result => {
          contentHtml += `
            <li>
              <a href="${result.link}" target="_blank">${result.title}</a>
              <p>Rating: ${result.rating}</p>
              <p>${result.snippet}</p>
            </li>
          `;
        });
        contentHtml += `</ul>`;
      }

      if (serp_results.peopleAlsoAsk && serp_results.peopleAlsoAsk.length > 0) {
        contentHtml += `<h3>People Also Ask:</h3><ul>`;
        serp_results.peopleAlsoAsk.forEach(result => {
          contentHtml += `
            <li>
              <a href="${result.link}" target="_blank">${result.title}</a>
              <p>${result.snippet}</p>
            </li>
          `;
        });
        contentHtml += `</ul>`;
      }

      if (serp_results.summarized_urls && serp_results.summarized_urls.length > 0) {
        contentHtml += `<h3>Summarized URLs:</h3><ul>`;
        serp_results.summarized_urls.forEach(result => {
          contentHtml += `
            <li>
              <a href="${result.url}" target="_blank">${result.title}</a>
              <p>${result.summary}</p>
            </li>
          `;
        });
        contentHtml += `</ul>`;
      }
    }

    return contentHtml;
  };

  useEffect(() => {
    if (promptText.current) {
      promptText.current.value =
        "A beautiful anime drawing of a smiling character full of joy, with colorful background, studio ghibli, ponyo, anime, excited, anime, saturated colors";
    }

    Subject_ImageUploaded$.asObservable().subscribe((imageURL) => {
      if (imageURL && typeof imageURL.mediaSource === "string") {
        setLeftAndRightImageURL({
          image1: imageURL.mediaSource,
          image2: noImage,
        });
        input1ImageOldValue.current = imageURL.mediaSource;
        if (promptText.current) {
          promptText.current.value = "";
        }
      }
    });

    Subject_EditInmageByPrompt$.asObservable().subscribe((imageURL) => {
      if (imageURL) {
        Subject_ShowModal$.next(true);
        const ajaxObservable = ajax({
          url: `${SERVER_URL}/image`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            input_image: imageURL,
            text_prompt: promptText.current ? promptText.current.value : "",
          },
        }).pipe(
          map((response) => response.response),
          catchError((error) => of(error))
        );

        ajaxObservable.subscribe({
          next: (value) => Subject_ImageEditedByPrompt$.next(value),
          error: (err) => console.log(err),
        });
      }
    });

    Subject_ImageEditedByPrompt$.asObservable().subscribe((editedImageData) => {
      if (editedImageData) {
        const image2 = editedImageData.data.output.output_images[0];
        setLeftAndRightImageURL({
          image1: input1ImageOldValue.current,
          image2,
        });
        Subject_ShowModal$.next(false);
      }
    });
  }, []);


  return (
    <div>
    <Modal></Modal>
      <div className="max-w-[1070px] mx-auto text-center">
        <div className="max-w-[730px] mx-auto text-center">
          <h3 className="lg:text-[45px] text-3xl leading-tight font-semibold">
            Create a perfect
            <br />
            SEO-optimized Title & Paragraph
          </h3>
        </div>
        <br />
        <p className="text-lg text-gray-700">
          Input a Google search query + your website & keywords to get AI search engine optimized content. This workflow parses the current top ranked sites and generates the best page summary for your site using OpenAI’s GPT3.5.
        </p>
      </div>
      <div className="max-w-[1192px] mx-auto mt-10 relative">
        <img
          alt="Dots"
          className="absolute -top-5 -left-10 opacity-30"
          src="assets/images/dots.svg"
        />
        <div className="p-10 w-full rounded-3xl cursor-pointer bg-white shadow-[0px_100px_60px_-70px_rgba(19,15,48,0.1) relative">
          <form onSubmit={handleSubmit}>
            <div className="-mx-4 flex flex-wrap relative">
              <div className="px-4 md:w-6/12 w-full">
                <h2>INPUTS</h2>
                <br />
                <label>Google Search Query</label>
                <br />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />
                <br />
                <label>Website Name</label>
                <br />
                <input
                  type="text"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />
                <br />
                <label>Website URL</label>
                <br />
                <input
                  type="text"
                  value={websiteURL}
                  onChange={(e) => setWebsiteURL(e.target.value)}
                  className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />
                <br />
                <label>Focus Keywords</label>
                <br />
                <input
                  type="text"
                  value={focusKeywords}
                  onChange={(e) => setFocusKeywords(e.target.value)}
                  className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />
              </div>
              <div className="px-4 md:w-6/12 w-full">
                <h2>OUTPUT</h2>
                {/* <textarea
                  value={generatedContent}
                  rows="20"
                  className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                  readOnly
                /> */}
                <iframe ref={iframe} className="iframe-textarea"></iframe>
              </div>
            </div>
            <button
              type="submit"
              className=" submit-button inline-flex items-center justify-center py-3 px-7 rounded-full text-base font-medium text-white bg-theme-dark shadow-md transition-all duration-200 hover:bg-blue-900 mt-6"
            >
              Generate SEO Content
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
