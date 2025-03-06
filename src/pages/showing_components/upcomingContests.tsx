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

// 在组件文件顶部添加样式定义
const gridStyles = {
  headerRow: {
    borderBottom: '2px gray solid', // 标题行底部边框
    margin: 0, // 覆盖 Bootstrap 的默认外边距
  },
  dataRow: {
    borderBottom: '1px solid rgb(146, 201, 255)', // 数据行底部边框
    margin: 0
  },
  colBorder: {
    borderRight: '1px solid rgb(146, 201, 255)', // 列右边框
    padding: '0.75rem' // 确保padding与border协调
  },
  lastCol: {
    borderRight: 'none' // 最后一列去除右边框
  }
};


  return (
    <>
    
<Container style={{ overflow: 'auto', border: '2px solid rgb(0, 166, 255)'}} className='text-center'>
  {isLoading && (<p>Loading...</p>)}
  <Row style={{borderBottom:'1px solid black'}}><h1>Upcoming Contests</h1></Row>
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