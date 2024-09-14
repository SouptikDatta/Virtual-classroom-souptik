import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClassById, addUnit, addSession, addLecture, addComment } from '../services/apiService';

const ManageClass = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [newUnit, setNewUnit] = useState('');
  const [newSession, setNewSession] = useState('');
  const [newLecture, setNewLecture] = useState('');
  const [newComment, setNewComment] = useState({ lectureId: '', comment: '' });

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const data = await getClassById(classId, localStorage.getItem('token'));
        setClassData(data);
      } catch (error) {
        console.error('Failed to fetch class data:', error);
      }
    };

    fetchClassData();
  }, [classId]);

  const handleAddUnit = async () => {
    try {
      await addUnit(classId, newUnit, localStorage.getItem('token'));
      setClassData((prev) => ({
        ...prev,
        units: [...prev.units, { title: newUnit }],
      }));
      setNewUnit('');
    } catch (error) {
      console.error('Error adding unit:', error);
    }
  };

  const handleAddSession = async (unitId) => {
    try {
      await addSession(classId, unitId, newSession, localStorage.getItem('token'));
      setClassData((prev) => ({
        ...prev,
        units: prev.units.map((unit) =>
          unit._id === unitId
            ? { ...unit, sessions: [...unit.sessions, { title: newSession }] }
            : unit
        ),
      }));
      setNewSession('');
    } catch (error) {
      console.error('Error adding session:', error);
    }
  };

  const handleAddLecture = async (sessionId) => {
    try {
      await addLecture(classId, sessionId, newLecture, localStorage.getItem('token'));
      setClassData((prev) => ({
        ...prev,
        units: prev.units.map((unit) => ({
          ...unit,
          sessions: unit.sessions.map((session) =>
            session._id === sessionId
              ? { ...session, lectures: [...session.lectures, { title: newLecture }] }
              : session
          ),
        })),
      }));
      setNewLecture('');
    } catch (error) {
      console.error('Error adding lecture:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      await addComment(classId, newComment.lectureId, newComment.comment, localStorage.getItem('token'));
      setClassData((prev) => ({
        ...prev,
        units: prev.units.map((unit) => ({
          ...unit,
          sessions: unit.sessions.map((session) => ({
            ...session,
            lectures: session.lectures.map((lecture) =>
              lecture._id === newComment.lectureId
                ? { ...lecture, comments: [...lecture.comments, { text: newComment.comment }] }
                : lecture
            ),
          })),
        })),
      }));
      setNewComment({ lectureId: '', comment: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!classData) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{classData.title}</h1>
      <p>{classData.description}</p>

      <div className="mb-6">
        <h2 className="text-xl">Add Unit</h2>
        <input
          type="text"
          placeholder="Unit Title"
          value={newUnit}
          onChange={(e) => setNewUnit(e.target.value)}
          className="border p-2 mb-2"
        />
        <button className="bg-blue-500 text-white p-2" onClick={handleAddUnit}>
          Add Unit
        </button>
      </div>

      {classData.units.map((unit) => (
        <div key={unit._id} className="mb-6">
          <h2 className="text-xl">Unit: {unit.title}</h2>
          <div>
            <input
              type="text"
              placeholder="Session Title"
              value={newSession}
              onChange={(e) => setNewSession(e.target.value)}
              className="border p-2 mb-2"
            />
            <button className="bg-blue-500 text-white p-2" onClick={() => handleAddSession(unit._id)}>
              Add Session
            </button>
          </div>
          {unit.sessions.map((session) => (
            <div key={session._id} className="mb-4">
              <h3 className="text-lg">Session: {session.title}</h3>
              <input
                type="text"
                placeholder="Lecture Title"
                value={newLecture}
                onChange={(e) => setNewLecture(e.target.value)}
                className="border p-2 mb-2"
              />
              <button className="bg-blue-500 text-white p-2" onClick={() => handleAddLecture(session._id)}>
                Add Lecture
              </button>
              {session.lectures.map((lecture) => (
                <div key={lecture._id} className="mb-2">
                  <h4 className="text-md">Lecture: {lecture.title}</h4>
                  <input
                    type="text"
                    placeholder="Add a Comment"
                    value={newComment.comment}
                    onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                    className="border p-2 mb-2"
                  />
                  <button
                    className="bg-blue-500 text-white p-2"
                    onClick={() => handleAddComment(lecture._id)}
                  >
                    Add Comment
                  </button>
                  <div>
                    {lecture.comments.map((comment, index) => (
                      <div key={index} className="border p-2 mb-1">
                        {comment.text}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ManageClass;
