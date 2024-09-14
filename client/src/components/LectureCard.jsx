import React, { useState, useEffect, useContext } from 'react';
import { getComments, addComment } from '../services/apiService';
import { AuthContext } from '../utils/AuthContext';
import CommentSection from '../pages/CommentSection';

const LectureCard = ({ lectureData }) => {
  const { token } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    async function fetchComments() {
      const commentsData = await getComments(lectureData._id, token);
      setComments(commentsData);
    }
    fetchComments();
  }, [token, lectureData._id]);

  const handleAddComment = async () => {
    const addedComment = await addComment(lectureData._id, { text: newComment }, token);
    setComments([...comments, addedComment]);
    setNewComment('');
  };

  return (
    <div className="border rounded-md p-4 shadow-md">
      <h3 className="text-lg font-bold">{lectureData.title}</h3>
      <p>{lectureData.content}</p>

      <div className="mt-4">
        <h4 className="font-semibold">Comments</h4>
        <CommentSection comments={comments} />
        <textarea
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 w-full mt-2"
        />
        <button className="bg-blue-500 text-white p-2 mt-2" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default LectureCard;
