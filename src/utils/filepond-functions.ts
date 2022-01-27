//See docu https://pqina.nl/filepond/docs/api/server/#advanced

interface ImageObj {
  name: string;
  filePath: string;
}

export const getServerSettings = (imgsToRestoreDetails: ImageObj[]) => {
  return {
    process: async (
      fieldName: any, // fieldName is the name of the input field
      file: any, // file is the actual file object to send
      metadata: any,
      load: any,
      error: any,
      progress: any,
      abort: any
    ) => {
      // Asynchronously uploading files with FilePond is called processing. In short, FilePond sends a file to the server and expects the server to return a unique file id. This unique id is then used to revert uploads or restore earlier uploads.

      //get authorization token for imagekit API
      const res = await fetch("/api/img/");
      const imgAuth = await res.json();

      const date = new Date().toISOString().slice(0, 7);

      // https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload
      // all parameters are describec in imagekit's docs
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("folder", `/tmp/${date}/`);
      formData.append("signature", imgAuth.signature);
      formData.append("token", imgAuth.token);
      formData.append("expire", imgAuth.expire);
      formData.append("publicKey", "public_h821WuPXEZBS6QvIimCu4L2vFt8=");

      const request = new XMLHttpRequest();
      request.open("POST", "https://upload.imagekit.io/api/v1/files/upload");

      // Should call the progress method to update the progress to 100% before calling load
      // Setting computable to false switches the loading indicator to infinite mode
      request.upload.onprogress = (e) => {
        progress(e.lengthComputable, e.loaded, e.total);
      };

      // Should call the load method when done and pass the returned server file id
      // this server file id is then used later on when reverting or restoring a file
      // so your server knows which file to return without exposing that info to the client
      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          // the load method accepts either a string (id) or an object
          load(JSON.parse(request.responseText).name);
          // console.log(JSON.parse(request.responseText));
          // console.log(JSON.parse(request.responseText).fileId);
        } else {
          // Can call the error method if something is wrong, should exit after
          error("Can't upload images");
        }
      };

      request.send(formData);

      // Should expose an abort method so the request can be cancelled
      return {
        abort: () => {
          // This function is entered if the user has tapped the cancel button
          request.abort();

          // Let FilePond know the request has been cancelled
          abort();
        },
      };
    },
    restore: async (
      uniqueFileName: string,
      load: any,
      error: any,
      progress: any,
      abort: any,
      headers: any
    ) => {
      // FilePond uses the restore end point to restore temporary server files. This might be useful in a situation where the user closes the browser window but hadn't finished completing the form. Temporary files can be set with the files property.

      // Should get the temporary file object from the server
      const request = new XMLHttpRequest();

      request.open(
        "GET",
        `https://ik.imagekit.io/rebelelectric${
          imgsToRestoreDetails.find((img) => img.name === uniqueFileName)! //dangerously set ! here !!!!!!!!!! fix it!
            .filePath
        }`
      );

      request.responseType = "blob";

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          let fileBlob;
          fileBlob = request.response;

          // Should call the progress method to update the progress to 100% before calling load
          // (computable, loadedSize, totalSize)
          progress(true, 0, 1024);

          // Should call the load method with a file object when done
          load(fileBlob);
        } else {
          // Can call the error method if something is wrong, should exit after
          error("Can't restore remote images");
        }
      };
      request.send();

      // Should expose an abort method so the request can be cancelled
      return {
        abort: () => {
          // User tapped abort, cancel our ongoing actions here
          request.abort();
          // Let FilePond know the request has been cancelled
          abort();
        },
      };
    },
    revert: null,
    fetch: null,
    load: null,
  };
};
