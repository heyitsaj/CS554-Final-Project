import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Add from './Add'
import {useQuery} from '@apollo/client';
import queries from '../queries';
import Navigation from './Navigation';

export default function Leaderboard() {
  const {loading, error, data} = useQuery(queries.GET_USERS, {
    fetchPolicy: 'cache-and-network'
  });

  if (data) {
    const {users} = data;

    return (
      <div>
        <Navigation />
        <h1>Welcome to the Leaderboard Page!</h1>
        <h2>Users</h2>
        <ol>
            {users && users.map((user) => {
              return (<li key={user._id}>
                        User: {user.email} | Number Of Solved Images: {user.numOfSolvedImages}
                      </li>)
            })}
        </ol>
      </div>
    );
  }
  else if (loading) {
    return <div>Loading</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }
}