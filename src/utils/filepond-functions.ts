//See docu https://pqina.nl/filepond/docs/api/server/#advanced
import type { ProcessServerConfigFunction, RestoreServerConfigFunction } from 'filepond';

interface IImageObj {
  name: string;
  filePath: string;
}

export const getServerSettings: (imgsToRestoreDetails: IImageObj[]) => {
  process: ProcessServerConfigFunction;
  restore: RestoreServerConfigFunction;
} = (imgsToRestoreDetails) => {
  return {
    // FIXME: remove below eslint disable line
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process: async (
      _fieldName, // fieldName is the name of the input field
      file, // file is the actual file object to send
      _metadata,
      load,
      error,
      progress,
      abort
    ) => {
      // Asynchronously uploading files with FilePond is called processing. In short, FilePond sends a file to the server and expects the server to return a unique file id. This unique id is then used to revert uploads or restore earlier uploads.
      //FIXME: Everybody can get this token
      //get authorization token for imagekit API
      try {
        const res = await fetch('/api/img/');
        const imgAuth = (await res.json()) as {
          token: string;
          expire: number;
          signature: string;
        };

        const date = new Date().toISOString().slice(0, 7);

        // https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload
        // all parameters are described in imagekit's docs
        //FIXME: everybody can send and OVERWRITE any image file at any location using this api!!!!
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('folder', `/tmp/${date}/`);
        formData.append('signature', imgAuth.signature);
        formData.append('token', imgAuth.token);
        formData.append('expire', imgAuth.expire.toString());
        formData.append('publicKey', process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? '');

        const request = new XMLHttpRequest();
        request.open('POST', 'https://upload.imagekit.io/api/v1/files/upload');

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
            const toLoad = JSON.parse(request.responseText) as { name: string };
            load(toLoad.name);
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
      } catch (err) {
        console.error(err);
      }
    },
    // FIXME: remove below eslint disable line
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    restore: async (uniqueFileName, load, error, progress, abort) => {
      // FilePond uses the restore end point to restore temporary server files. This might be useful in a situation where the user closes the browser window but hadn't finished completing the form. Temporary files can be set with the files property.

      // Should get the temporary file object from the server
      try {
        const request = new XMLHttpRequest();

        request.open(
          'GET',
          `https://ik.imagekit.io/rebelelectric${
            imgsToRestoreDetails.find((img) => img.name === uniqueFileName)?.filePath ?? ''
          }`
        );

        request.responseType = 'blob';

        request.onload = () => {
          if (request.status >= 200 && request.status < 300) {
            const fileBlob = request.response as File;

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
      } catch (err) {
        console.error(err);
      }
    },
    revert: null,
    fetch: null,
    load: null,
  };
};
