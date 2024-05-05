import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Add from './Add'
import {useQuery} from '@apollo/client';
import queries from '../queries'

export default function SharedImages() {
  const [showAddForm, setShowAddForm] = useState(false);

  const {loading, error, data} = useQuery(queries.GET_SHARED_IMAGES, {
    fetchPolicy: 'cache-and-network'
  });

  const closeAddFormState = () => {
    setShowAddForm(false);
  };
  
  if (data) {
    const {sharedImages} = data;
    return (
      <div>
        <h1>Upload and Display Image usign React Hook's</h1>
        <button className='button' onClick={() => setShowAddForm(!showAddForm)}>
            Upload Shared Image
        </button>
        {showAddForm && (
            <Add type='sharedImage' closeAddFormState={closeAddFormState} />
        )}
        <br />
        <br />
  
        {sharedImages && sharedImages.map((sharedImage) => {
            return (
              <div className='card' key={sharedImage._id}>
                <div className='card-body'>
                  <h2 className='card-title'>
                  <Link className='navlink' to={{
                      pathname:`/SharedImages/${sharedImage._id}`
                  }}>       
                  {sharedImage._id}
                  </Link>
                  </h2>
                  <h3 className='card-title'>
                    Image: {sharedImage._id}
                  </h3>
                  <img src={sharedImage.image} alt="Shared Image" width="500" height="600"></img>
                  <button
                    className='button'
                    onClick={() => {
                      handleOpenEditModal(sharedImage);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className='button'
                    onClick={() => {
                      handleOpenDeleteModal(sharedImage);
                    }}
                  >
                    Delete
                  </button>
                  <br />
                </div>
              </div>
            );
        })}
      </div>
    );
  }
  else if (loading) {
    return <div>Loading</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }
}
