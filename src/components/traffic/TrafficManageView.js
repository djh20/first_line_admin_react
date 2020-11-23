import * as React from 'react';
import {
  useAnalyticsApi,
  useAuthorize,
  useDataChart,
  useSignOut,
  useViewSelector,
} from 'react-use-analytics-api';
export default function UseDataChartExample() {
  const { ready, gapi, authorized, error } = useAnalyticsApi();
  const [viewId, setViewId] = React.useState();
  const viewSelectorContainerId = 'view-selector-container';
  useViewSelector(authorized ? gapi : undefined, viewSelectorContainerId, viewId => setViewId(viewId));
  const query = {
    ids: viewId,
    'start-date': '28daysAgo',
    'end-date': 'today',
    metrics: 'ga:sessions',
    dimensions: 'ga:date',
  };
  const chart = {
    container: 'data-chart-container',
    type: 'LINE',
    options: {
      title: 'Sessions (28 Days)',
    },
  };
  useDataChart(authorized ? gapi : undefined, query, chart);
  // Workaround for API limitation - see useAuthorize docs
  const authDiv = React.useRef(null);
  const [authorizeCalled, setAuthorizeCalled] = React.useState(false);
  const hasAuthElements = authDiv.current && authDiv?.current?.children?.length > 0;
  const authorize = useAuthorize(gapi, {
    clientId:'999872818887-f7668umpbj2gp2v92iqvnc5q9qijvqfb.apps.googleusercontent.com',
    container: 'authorize-container-id',
  });
  const signOut = useSignOut(gapi);
  React.useEffect(() => {
    if (ready && !error && !authorizeCalled) {
      authorize();
      setAuthorizeCalled(true);
    }
  }, [ready, error, authorizeCalled, authorize]);
  return (
    <div>
      {!ready && <div>Loading...</div>}
      {ready && (
        <div>
          {authorized && (
            <div>
              <div style={{ marginTop: '30px' }}>
                <div className="data-chart" id="data-chart-container" />
              </div>
              <div id={viewSelectorContainerId} />
              <div>
                <button onClick={() => signOut()}>Sign Out</button>
              </div>
            </div>
          )}
          {!authorized && (
            <div>
              <div ref={authDiv} id="authorize-container-id"></div>
              {!hasAuthElements && <div>🔄 Refresh the page to sign in.</div>}
            </div>
          )}
        </div>
      )}
      {error && <div>{error.toString()}</div>}
    </div>
  );
}