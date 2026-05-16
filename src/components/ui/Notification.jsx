import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotification, hideNotification } from '../../redux/uiSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);

  if (!notification) return null;

  const { status, title, message } = notification;

  let statusClass = 'notification';
  if (status === 'success') statusClass += ' notification-success';
  if (status === 'error') statusClass += ' notification-error';
  if (status === 'pending') statusClass += ' notification-pending';

  return (
    <div className={statusClass}>
      <div className="notification-content">
        <h4 className="notification-title">{title}</h4>
        <p className="notification-message">{message}</p>
      </div>
      <button 
        className="notification-close" 
        onClick={() => dispatch(hideNotification())}
      >
        ✕
      </button>
    </div>
  );
};

export default Notification;
