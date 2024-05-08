import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Add from './Add'
import {useQuery} from '@apollo/client';
import queries from '../queries';
import Navigation from './Navigation';
import "./Leaderboard.css"

export default function Leaderboard() {
  const {loading, error, data} = useQuery(queries.GET_USERS, {
    fetchPolicy: 'cache-and-network'
  });

  if (data) {
    const {users} = data;

    // make copy and sort because source copy is locked
    let sortedUsers = users.slice().sort((a, b) => b.numOfSolvedImages - a.numOfSolvedImages);
    const heading = ["User", "Solved Images"];
    return (
      <div>
        <Navigation />
        <h1>Welcome to the Leaderboard Page!</h1>
        <h2 className=''>Users</h2>
        <table style={{ width: 500 }}>
                <thead className="leaderboard-table-header">
                    <tr>
                        {heading.map((head, headID) => (
                            <th key={headID}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="leaderboard-table-body">
                    {sortedUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td className='userEmailCol'>{user.email}</td>
                        <td className='userSolvedCol'>{user.numOfSolvedImages}</td>
                      </tr>
                    ))}
                </tbody>
        </table>
      </div>
    );
  }
  else if (loading) {
    return <div>Loading</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }
}