// "use client";

// import { useState } from "react";
// import SubmitButton from "@/components/ui/form-submit-button";
// import { useFormState, useFormStatus } from "react-dom";
// import { createEvent } from "@/lib/actions";

// export default function EventImagesForm({ eventId }: { eventId: string }) {
//   const [images, setImages] = useState<File[]>([]);
//   const initialState = { message: null, errors: {} };
//   const [state, formAction] = useFormState(createEvent, initialState);
//   //   const [state, formAction] = useFormState(uploadEventImages, initialState);
//   const { pending } = useFormStatus();

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setImages(Array.from(e.target.files));
//     }
//   };

//   return (
//     <form action={formAction} className="space-y-6">
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         <div className="mb-4">
//           <label
//             htmlFor="event_images"
//             className="mb-2 block text-sm font-medium"
//           >
//             Upload Event Images
//           </label>
//           <input
//             id="event_images"
//             name="event_images"
//             type="file"
//             accept="image/jpeg, image/png"
//             multiple
//             onChange={handleImageChange}
//             className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
//             aria-describedby="images-error"
//           />
//           <p className="mt-1 text-sm text-gray-500">
//             You can select multiple images to upload. <br />
//             File size for each image should not exceed 5MB.
//           </p>

//           {/* Preview selected images */}
//           {images.length > 0 && (
//             <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//               {Array.from(images).map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt={`Preview ${index + 1}`}
//                     className="h-40 w-full rounded-lg object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setImages(images.filter((_, i) => i !== index));
//                     }}
//                     className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
//                   >
//                     <svg
//                       className="h-4 w-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div id="images-error" aria-live="polite" aria-atomic="true">
//             {state.errors?.images &&
//               state.errors.images.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))}
//           </div>
//         </div>

//         {/* Form-level error messages */}
//         <div id="form-error" aria-live="polite" aria-atomic="true">
//           {state.message && (
//             <p className="mt-2 text-sm text-red-500">{state.message}</p>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-end gap-4">
//         <SubmitButton />
//       </div>
//     </form>
//   );
// }
