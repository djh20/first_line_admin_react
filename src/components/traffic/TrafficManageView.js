import React, {useContext} from 'react';
import { AnalyticsDashboard } from 'react-analytics-charts';
import { SessionsByDateChart, 
  SessionsGeoChart,
  SessionsBySourceChart,
  SessionsByHourChart,
  PageViewsPerPathChart,
  ActiveUsersChart,
  SessionsByUserTypeChart,
  SessionsByDeviceCategoryChart
} 
  from 'react-analytics-charts';
import {makeStyles} from '@material-ui/core';
import "./test.css"
import GraphWrapper from './GraphWrapper'

const useStyle = makeStyles(theme=>({
  chart:{
    background : 'red'
  }
}))


export default function UseDataChartExample() {
  const classes = useStyle();
  return (
    <div className ={classes.root}>
<AnalyticsDashboard
authOptions={{ clientId : "999872818887-f7668umpbj2gp2v92iqvnc5q9qijvqfb.apps.googleusercontent.com"}}
renderCharts={(gapi, viewId) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
      <GraphWrapper Graph={ ()=>{return (
              <SessionsByDateChart
              gapi={gapi}
              viewId={viewId}
              showPageViews
              showUsers
              options={{ width: '100%' }}
            />
      )}
      }
      title="일별 세션 사용 통계"
      width="60%"
      />

      <GraphWrapper Graph={ ()=>{return (
      <PageViewsPerPathChart
      gapi={gapi}
      viewId={viewId}
      options={{ width: '100%' }}
      />
      )}
      }
      title="경로별 조회 수"
      width="20%"
      />

      <GraphWrapper Graph={ ()=>{return (
      <SessionsGeoChart
      gapi={gapi}
      viewId={viewId}
      showPageViews
      options={{ width: '100%' }}
    />
      )}
      }
      title="사용자 위치 파악"
      width="40%"
      />

    <GraphWrapper Graph={ ()=>{return (
      <SessionsBySourceChart
      gapi={gapi}
      viewId={viewId}
      options={{ width: '100%' }}
      />
      )}
      }
      title="세션 유입 경로"
      width="40%"
      />

      <GraphWrapper Graph={ ()=>{return (
      <SessionsByHourChart
      gapi={gapi}
      viewId={viewId}
      options={{ width: '100%' }}
      />
      )}
      }
      title="시간별 세션 통계"
      width="40%"
      />
      <GraphWrapper Graph={ ()=>{return (
      <ActiveUsersChart
      gapi={gapi}
      viewId={viewId}
      days={28}
      activeUserDays={7}
      options={{ width: '100%' }}
      />
      )}
      }
      title="주간 활성 유저 통계"
      width="40%"
      />      



    <GraphWrapper Graph={ ()=>{return (
      <SessionsByUserTypeChart gapi={gapi} viewId={viewId} days={28} options={{ width: '100%' }}/>
      )}
      }
      title="사용자 타입 통계"
      width="40%"
      />     

    <GraphWrapper Graph={ ()=>{return (
      <SessionsByDeviceCategoryChart gapi={gapi} viewId={viewId} days={28} options={{ width: '100%' }}/>
      )}
      }
      title="사용 디바이스 통계"
      width="40%"
      />           



    </div>
  )
}}
/>
    </div>
  )
}