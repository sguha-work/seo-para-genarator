import { useEffect, useRef, useState } from "react";
import { Subject_ShowModal$ } from "../../subjects/modal.behavior-subject";
import {
  Subject_ImageUploaded$,
  Subject_EditInmageByPrompt$,
  Subject_ImageEditedByPrompt$,
} from "../../subjects/image.behavior-subject";
import Modal from "./model.component";
// import "./result-card.component.css";
import { ajax } from "rxjs/ajax";
import { map, catchError, of } from "rxjs";
import { SERVER_URL } from "../../constants/common.constant";

export default function Drag() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [link, setLink] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleLinkImport = () => {
    console.log("Importing link:", link);
  };

  const dummyImage1 =
    "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/f68feb16-5925-11ed-83cc-02420a0000c8/Image3.jpg";
  const dummyImage2 =
    "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/fda030fa-f8fc-11ee-9505-02420a00015d/gooey.ai%20-%20colorful%20background%20studio%20ghibli%20ponyo%20anime%20excited%20anime%20saturated%20colors%20color..png";
  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png";
  const promptText = useRef(null);
  const input1ImageOldValue = useRef(dummyImage1);
  const [leftAndRightImageURL, setLeftAndRightImageURL] = useState({
    image1: dummyImage1,
    image2: dummyImage2,
  });
  const submitPrompt = () => {
    Subject_ShowModal$.next(true);
    Subject_EditInmageByPrompt$.next(leftAndRightImageURL.image1);
  };
  useEffect(() => {
    promptText.current.value =
      "A beautiful anime drawing of a smiling character full of joy, with colorful background, studio ghibli, ponyo, anime, excited, anime, saturated colors";
    Subject_ImageUploaded$.asObservable().subscribe((imageURL) => {
      imageURL &&
        typeof imageURL.mediaSource == "string" &&
        (() => {
          setLeftAndRightImageURL({
            image1: imageURL.mediaSource,
            image2: noImage,
          });
          input1ImageOldValue.current = imageURL.mediaSource;
          promptText.current.value = "";
        })();
    });
    Subject_EditInmageByPrompt$.asObservable().subscribe((imageURL) => {
      imageURL &&
        (() => {
          Subject_ShowModal$.next(true);
          const ajaxObservable = ajax({
            url: `${SERVER_URL}/image`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              input_image: imageURL,
              text_prompt: promptText.current.value,
            },
          }).pipe(
            map((response) => response.response),
            catchError((error) => of(error))
          );

          ajaxObservable.subscribe({
            next: (value) => Subject_ImageEditedByPrompt$.next(value),
            error: (err) => console.log(err),
          });
        })();
    });
    Subject_ImageEditedByPrompt$.asObservable().subscribe((editedImageData) => {
      editedImageData &&
        (() => {
          const image2 = editedImageData.data.output.output_images[0];
          console.log({ leftAndRightImageURL });
          setLeftAndRightImageURL({
            image1: input1ImageOldValue.current,
            image2,
          });
          Subject_ShowModal$.next(false);
        })();
    });
  }, []);
  return (
    <div>
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
          <div className="-mx-4 flex flex-wrap relative">
            <div className="px-4 md:w-6/12 w-full">
            <h2>INPUTS</h2><br/>
            <label>Google Search Query</label><br/>
            <input type="text"  className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300  rounded-lg cursor-pointer bg-gray-50"
></input><br/>
            <label>Website Name</label><br/>
            <input type="text"  className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300  rounded-lg cursor-pointer bg-gray-50"
></input><br/>
            <label>Website URL</label><br/>
            <input type="text"  className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300  rounded-lg cursor-pointer bg-gray-50"
></input><br/>
              <h3 className="mb-2 text-2xl font-semibold">Focus Keywords (optional)</h3>
              <div className="">
              <textarea
    ref={promptText}
    placeholder="Write Your Prompt..."
    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-90"
    cols="30"
    id=""
    name=""
    rows="10"
></textarea>


<select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <svg class="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="3" />  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                  <option selected>Settings</option>
                  <option value="US">Add</option>
                  <option value="CA">Delete</option>
                  <option value="FR">Modify</option>
                  <option value="DE">Undo</option>
                </select>
               
                <div class="text-right">
                <button class="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
  Submit
</button>

</div>



              </div>
             
            </div>

            <div className="px-4 md:w-6/12 w-full">
              <div className="border border-slate-300 rounded-lg">
                <div className="py-3 px-5 rounded-t-lg bg-slate-100">
                
                  <h2 className="mb-1 text-lg font-semibold leading-none">
                    Generated Content
                  </h2>
               
                </div>
                <div className="p-5">
                <div className="">
                <textarea
                  value=" Ducati Monster 1200R
                  In 2016, Ducati launched the most powerful Monster to date, with the all-new Monster 1200R. With the 1198 cc, L-twin belting out 152 bhp at 9250 and 131 Nm at 7750 rpm, the new Monster 1200R makes more than twice the power of the original Monster 900. With a full TFT instrument panel, riding modes, Bosch ABS system, and Ducati Traction Control, the Monster 1200R pushes the envelope of the Ducati Monster to become one of the most sophisticated and powerful modern street nakeds.
                  
                   
                  
                  2017 - Ducati Monster 797
                  The year later, Ducati decided to go back to the drawing board to include new and comparatively inexperienced riders into the Monster family with the new Ducati Monster 797. With an engine borrowed from the Ducati Scrambler, the Monster 797's 803 cc, L-twin motor puts out 72 bhp and 67 Nm. In terms of riding aids, it just gets the basic ABS, so no traction control, and no riding modes, but you get a fairly decent, inimitable Monster which is easily accessible, even to riders with little experience, or beginners."
                  placeholder="Write Your Prompt..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  cols="30"
                  id=""
                  name=""
                  rows="10"
                ></textarea>
              </div>

                  <div className="py-4">
                    <hr />
                  </div>

                 
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
