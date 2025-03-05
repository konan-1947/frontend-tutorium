import { useSearchTutors } from '../../../hooks/Search/Search'; // Importing the custom hook
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FaStar } from 'react-icons/fa';
  // Bạn có thể thay thế bằng URL động nếu cần

import { useNavigate } from 'react-router-dom';

const TutorSearch = () => {
  const { mutate, isLoading, error, data } = useSearchTutors();

  // Handle form submission with FormData
  const handleSearch = (e) => {
    e.preventDefault();
    const form = new FormData(e.target); // Collect the form data
    mutate(form); // Trigger the mutation with FormData
  };

  // Log the data for debugging purposes
  console.log('Fetched Data:', data);

  // Handle rendering the tutor results
  const renderTutors = (tutors) => {
    return (
      <div>
        <h2>Tutor Results</h2>
        <ul>
          {tutors.map((tutor, index) => (
            <li key={index}>
          
              <p>Username: {tutor.User?.username}</p>
              <p>
                Category: {tutor.Categories ? tutor.Categories.map(cat => cat.categoryname).join(', ') : 'No categories'}
              </p>
              <p>Expected Salary: {tutor.expectedsalary}</p>
              {tutor.distance && <p>Distance: {tutor.distance} km</p>}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          <label>
            Display Name:
            <input type="text" name="displayname" />
          </label>
        </div>
        <div>
          <label>
            Category:
            <input type="text" name="category" />
          </label>
        </div>
        <div>
          <label>
            Expected Salary Range:
            <input type="text" name="expectedsalary" />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input type="text" name="address" />
          </label>
        </div>
        <div>
          <label>
            User Address:
            <input type="text" name="userAddress" />
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search Tutors'}
        </button>
      </form>

      {error && <p>Error fetching data: {error.message}</p>}

      {data ? (
        Array.isArray(data) ? (
          renderTutors(data)
        ) : data.tutors && Array.isArray(data.tutors) ? (
          renderTutors(data.tutors)
        ) : (
          <p>No tutors found or invalid data structure</p>
        )
      ) : null}
    </div>
  );
};

export default TutorSearch;
