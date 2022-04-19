import React from 'react';
import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  NotificationDropdown,
  Activity,
  ActivityFooter,
  LikeButton,
  CommentField,
  CommentList,
  CommentItem,
  InfiniteScrollPaginator,
} from 'react-activity-feed';
import { useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { CloseCreateChannel } from '../assets';
import 'react-activity-feed/dist/index.css';


const cookies = new Cookies();

//should be in .env 
const apiKey = process.env.API_KEY;
const appID = process.env.APP_ID;


const ActivityFeed = ({ setIsReading }) => {

 


  const authToken = cookies.get("token");
  const id = cookies.get("userId");


  return (
    <div className="create-channel__container">

      <StreamApp apiKey={apiKey} appId={appID} token={authToken}>
        <div className="create-channel__header">
          <p>Feed</p>
          <CloseCreateChannel setIsReading={setIsReading} />
        </div>
        <div className="wrapper box">
          <NotificationDropdown right />
        </div>
        <StatusUpdateForm
          modifyActivityData={(data) => ({ ...data, to: ['global:all'] })}
        />


        <FlatFeed
          notify
          userId="all"
          feedGroup="global"
          options={{ withOwnChildren: true, withRecentReactions: true }}
          Paginator={InfiniteScrollPaginator}
          Activity={({ activity, feedGroup }) => (
            <Activity
              activity={activity}
              feedGroup={feedGroup}
              userId="all"
              Footer={() => (
                <>
                  <ActivityFooter activity={activity} feedGroup={feedGroup} userId="all" />
                  <CommentField activity={activity} />
                  <CommentList
                    activityId={activity.id}
                    CommentItem={({ comment }) => (
                      <div className="wrapper">
                        <CommentItem comment={comment} />
                        <LikeButton reaction={comment} />
                      </div>
                    )}
                  />
                </>
              )}
            />
          )}
        />
      </StreamApp>

    </div>

  );
};

export default ActivityFeed;
