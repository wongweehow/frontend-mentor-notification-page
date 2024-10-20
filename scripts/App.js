const mockDb = [
  {
    id: 1,
    user: "Mark Webber",
    avatar: "assets/images/avatar-mark-webber.webp",
    event: "react_to_post",
    timePast: "1m",
    snippet: "My first tournament today!",
    read: false,
  },
  {
    id: 2,
    user: "Angela Gray",
    avatar: "assets/images/avatar-angela-gray.webp",
    timePast: "5m",
    event: "follow",
    snippet: "",
    read: false,
  },
  {
    id: 3,
    user: "Jacob Thompson",
    avatar: "./assets/images/avatar-jacob-thompson.webp",
    timePast: "1day",
    event: "join_group",
    snippet: "Chess Club",
    read: false,
  },
  {
    id: 4,
    user: "Rizky Hasanuddin",
    avatar: "./assets/images/avatar-rizky-hasanuddin.webp",
    timePast: "5days",
    event: "private_message",
    snippet:
      "Hello, thanks for setting up the Chessclub. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
    read: true,
  },
  {
    id: 5,
    user: "Kimberly Smith",
    avatar: "./assets/images/avatar-kimberly-smith.webp",
    timePast: "1week",
    event: "picture",
    snippet: "./assets/images/image-chess.webp",
    read: true,
  },
  {
    id: 6,
    user: "Nathan Peterson",
    avatar: "./assets/images/avatar-nathan-peterson.webp",
    timePast: "2weeks",
    event: "react_to_post",
    snippet: "5 end-game strategies to increase your win rate",
    read: true,
  },
  {
    id: 7,
    user: "Anna Kim",
    avatar: "./assets/images/avatar-anna-kim.webp",
    timePast: "2weeks",
    event: "leave_group",
    snippet: "Chess Club",
    read: true,
  },
];

function NotificationCard(props) {
  return (
    <div
      className={`notification-card ${!props.read ? "bg-unread" : ""}`}
      onClick={() => props.updateRead(props.id)}
    >
      <img className="avatar" src={props.avatar} />
      <div className="notification-content">
        {props.event === "follow" ? (
          <>
            <p>
              <span className="user-name" onClick={(e) => e.stopPropagation()}>
                {props.user}
              </span>
              <span className="description-text"> followed you </span>
              <span className={!props.read ? "unread-dot" : ""}></span>
            </p>
            <p className="time-past">{props.timePast}</p>
          </>
        ) : props.event === "react_to_post" ? (
          <>
            <p>
              <span className="user-name" onClick={(e) => e.stopPropagation()}>
                {props.user}
              </span>
              <span className="description-text">
                {" "}
                reacted to your recent post{" "}
              </span>
              <span className="post" onClick={(e) => e.stopPropagation()}>
                {props.snippet}{" "}
              </span>
              <span className={!props.read ? "unread-dot" : ""}></span>
            </p>
            <p className="time-past">{props.timePast}</p>
          </>
        ) : props.event === "join_group" ? (
          <>
            <p>
              <span className="user-name" onClick={(e) => e.stopPropagation()}>
                {props.user}
              </span>
              <span className="description-text"> has joined your group </span>
              <span className="group" onClick={(e) => e.stopPropagation()}>
                {props.snippet}{" "}
              </span>
              <span className={!props.read ? "unread-dot" : ""}></span>
            </p>
            <p className="time-past">{props.timePast}</p>
          </>
        ) : props.event === "leave_group" ? (
          <>
            <p>
              <span className="user-name" onClick={(e) => e.stopPropagation()}>
                {props.user}
              </span>
              <span className="description-text"> has left the group </span>
              <span className="group" onClick={(e) => e.stopPropagation()}>
                {props.snippet}{" "}
              </span>
              <span className={!props.read ? "unread-dot" : ""}></span>
            </p>
            <p className="time-past">{props.timePast}</p>
          </>
        ) : props.event === "private_message" ? (
          <>
            <p>
              <span className="user-name" onClick={(e) => e.stopPropagation()}>
                {props.user}
              </span>
              <span className="description-text">
                {" "}
                sent you a private message{" "}
              </span>
              <span className={!props.read ? "unread-dot" : ""}></span>
            </p>
            <p className="time-past">{props.timePast}</p>
            <p className="private-message" onClick={(e) => e.stopPropagation()}>
              {props.snippet}
            </p>
          </>
        ) : props.event === "picture" ? (
          <>
            <div className="pic-notification">
              <div>
                <p>
                  <span
                    className="user-name"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {props.user}
                  </span>
                  <span className="description-text">
                    {" "}
                    commented on your picture{" "}
                  </span>
                  <span className={!props.read ? "unread-dot" : ""}></span>
                </p>
                <p className="time-past">{props.timePast}</p>
              </div>
              <img src={props.snippet} />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function MyApp() {
  const [notifications, setNotifications] = React.useState(mockDb);
  const [totalUnread, setTotalUnread] = React.useState(0);

  React.useEffect(() => {
    let unreadCount = 0;
    notifications.forEach((notification) => {
      if (!notification.read) {
        unreadCount += 1;
      }
    });
    setTotalUnread(unreadCount);
  }, [notifications]);

  const updateRead = (id) => {
    setNotifications((prevNotif) =>
      prevNotif.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const readAll = () => {
    setNotifications((prevNotif) => (
      prevNotif.map((notif) => (
        { ...notif, read: true }
      ))
    ))
  }

  const cards = notifications.map((notification, index) => (
    <NotificationCard
      key={index}
      id={notification.id}
      avatar={notification.avatar}
      user={notification.user}
      timePast={notification.timePast}
      event={notification.event}
      snippet={notification.snippet}
      read={notification.read}
      updateRead={updateRead}
    />
  ));

  return (
    <div className="container">
      <div className="notification-panel">
        <section id="header">
          <h1>
            <span>Notifications </span>
            <span id="count">{totalUnread}</span>
          </h1>
          <button id="mark-read" onClick={readAll}>Mark all as read</button>
        </section>
        <section id="notification-container">{cards}</section>
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
