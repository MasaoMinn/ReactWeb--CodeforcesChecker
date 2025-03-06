import { useTheme } from '@/components/themeProvider';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
interface Contest {
  id: number,
  name: string,
  type: string,
  phase: string,
  frozen: boolean,
  durationSeconds: number,
  startTimeSeconds: number,
  relativeTimeSeconds: number,
}
export default ()=> {
const [contestList,setContestList]=useState<Contest[]>([]);
const [upcomingContests,setUpcomingContests]=useState<Contest[]>([]);
const [isLoading,setIsLoading]=useState(true);
async function getContestList() {
  try {
    setIsLoading(true);
    // 创建一个 Axios 实例并设置超时时间
    const axiosInstance = axios.create({
        timeout: 10000, // 设置超时时间为 10 秒
    });

    // 发起 GET 请求
    const response = await axiosInstance.get('https://codeforces.com/api/contest.list?gym=false');
    setContestList(response.data.result);
  } catch (err) {
    if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.code === 'ECONNABORTED') {
            alert('请求超时，请稍后再试。');
        } else {
            alert(`请求出错: ${axiosError.message}`);
        }
    } else {
        alert('发生未知错误，请稍后再试。');
    }
} finally {
    setIsLoading(false);
}
}
function getUpcomingContests() {
  const upcoming = contestList.filter(contest => contest.phase == "BEFORE");
  setUpcomingContests(upcoming.toReversed());
}
function getTimeInteval(milliseconds:number) {
  // 将毫秒数转换为秒数
  let totalSeconds = Math.floor(milliseconds / 1000);

  // 计算天数
  let days = Math.floor(totalSeconds / (24 * 3600));
  totalSeconds %= 24 * 3600;

  // 计算小时数
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;

  // 计算分钟数
  let minutes = Math.floor(totalSeconds / 60);

  // 格式化输出
  if(days!=0) return (<>
    <b>{String(days)}</b> day{days==1?'':'s'} <b>{String(hours)}</b> hour{hours==1?'':'s'} <b>{String(minutes)}</b> minute{minutes==1?'':'s'}</>) ;
  if(hours!=0) return (<>
    <b>{String(hours)}</b> hour{hours==1?'':'s'} <b>{String(minutes)}</b> minute{minutes==1?'':'s'}</>) ;
  return (<>
    <b>{String(minutes)}</b> minute{minutes==1?'':'s'}</>) ;
}
  // 在组件挂载时获取竞赛列表
  useEffect(() => {
    getContestList();
  }, []);

  // 当 contestList 改变时，更新即将到来的竞赛列表
  useEffect(() => {
    getUpcomingContests();
  }, [contestList]);
  const { theme } = useTheme(); // 获取当前主题
  
  const dynamicStyles = {
    containerBorder: theme === 'dark' 
      ? '2px solid rgba(255,255,255,0.7)' 
      : '2px solid rgb(0, 166, 255)',
    textColor: theme === 'dark' ? 'rgba(255,255,255,0.9)' : '#333',
    rowBorder: theme === 'dark' 
      ? '1px solid rgba(255,255,255,0.3)' 
      : '1px solid rgb(146, 201, 255)'
  };

const gridStyles = {
  headerRow: {
    borderBottom: theme === 'dark' 
      ? '2px solid rgba(255,255,255,0.5)' 
      : '2px gray solid',
    margin: 0,
    color: dynamicStyles.textColor
  },
  dataRow: {
    borderBottom: dynamicStyles.rowBorder,
    margin: 0,
    color: dynamicStyles.textColor
  },
  colBorder: {
    borderRight: dynamicStyles.rowBorder,
    padding: '0.75rem'
  },
  lastCol: {
    borderRight: 'none'
  }
};


  return (
    <>
  <Container className='text-center' style={{ overflow: 'auto',border: dynamicStyles.containerBorder,
  backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.85)' : 'white'}}>
  {isLoading && (<p>Loading...</p>)}
  <Row style={gridStyles.headerRow}><h1>Upcoming Contests</h1></Row>
  <Row style={gridStyles.headerRow}>
    <Col className='col-1' style={gridStyles.colBorder}><b>Contest ID</b></Col>
    <Col className='col-5' style={gridStyles.colBorder}><b>Contest Name</b></Col>
    <Col className='col-3' style={gridStyles.colBorder}><b>From Now</b></Col>
    <Col className='col-3' style={{ ...gridStyles.colBorder, ...gridStyles.lastCol }}><b>Contest Time</b></Col>
  </Row>

  {upcomingContests.map((contest) => (
    <Row 
      key={contest.id} 
      style={gridStyles.dataRow}
      className="p-0" // 覆盖默认 padding
    >
      <Col className='col-1' style={gridStyles.colBorder}>{contest.id}</Col>
      <Col className='col-5' style={gridStyles.colBorder}>{contest.name}</Col>
      <Col className='col-3' style={gridStyles.colBorder}>{getTimeInteval(-contest.relativeTimeSeconds*1000)}</Col>
      <Col className='col-3' style={{ ...gridStyles.colBorder, ...gridStyles.lastCol }}>
        {new Date(contest.startTimeSeconds*1000).toLocaleString()}
      </Col>
    </Row>
  ))}
</Container>
    </>
  );
}