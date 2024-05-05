import React, {useState} from 'react';

import {useQuery, useMutation} from '@apollo/client';
//Import the file where my query constants are defined
import queries from '../queries';

function Add(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64URL, setBase64URL] = useState(null);

  const [addSharedImage] = useMutation(queries.ADD_SHARED_IMAGE, {
    update(cache, {data: {addSharedImage}}) {
      const {sharedImages} = cache.readQuery({
        query: queries.GET_SHARED_IMAGES
      });
      cache.writeQuery({
        query: queries.GET_SHARED_IMAGES,
        data: {sharedImages: [...sharedImages, addSharedImage]}
      });
    }
  });

  const onSubmitSharedImage = (e) => {
    e.preventDefault();
    try{
      let description = document.getElementById('description');
      let image = document.getElementById('uploaded-image');
      let userId = "1";

      addSharedImage({
        variables: {
          userId: userId,
          image: base64URL,
          dateFormed: "03/31/1994",
          description: description.value,
        }
      });
  
      document.getElementById('add-shared-image').reset();
    }
    catch(ex){
      alert(ex);
    }

    props.closeAddFormState();
  };

  const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
    });
  };

  let body = null;
  if (props.type === 'sharedImage'){
    console.log('at shared image add');
    body = (
      <div className='card'>
              {selectedImage && (
        <div>
          <img
            id='uploaded-image'
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
      <br />
      <form className='form' id='add-shared-image' encType='multipart/form-data' onSubmit={onSubmitSharedImage}>
          <div className='form-group'>
            <label>
              Description:
              <input id='description' autoFocus={true} />
            </label>
          </div>
          <br />
          <div className='form-group'>
            <input name={'document'} type={'file'} onChange={({target: { files }}) => {
                                        const file = files[0]
                                        console.log(file);
                                        getBase64(file)
                                          .then(result => {
                                            file["base64"] = result;
                                            console.log("File Is", file);
                                            setSelectedFile(file);
                                            setBase64URL(result);
                                          })
                                          .catch(err => {
                                            console.log(err);
                                          });                           
                                    }}/>                                
          </div>
          <button className='button add-button' type='submit'>
            Upload Image
          </button>
          <button
            type='button'
            className='button cancel-button'
            onClick={() => {
              document.getElementById('add-shared-image').reset();
              props.closeAddFormState();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
  return <div>{body}</div>;
}

export default Add;
