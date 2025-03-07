import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useUserInfo } from '@/components/userProvider';
import { useCallback, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Col, Container, Row } from 'react-bootstrap';
import { useTheme } from '../../components/themeProvider';
import styled from 'styled-components';
import FortuneBtn from '../../components/fortuneButton';

interface User {
  lastName: string;
  country: string;
  lastOnlineTimeSeconds: number;
  city: string;
  rating: number;
  friendOfCount: number;
  titlePhoto: string;
  handle: string;
  avatar: string;
  firstName: string;
  contribution: string;
  organization: string;
  rank: number;
  maxRating: number;
  registrationTimeSeconds: string;
  maxRank: number;
};

export default () => {
  const {userInfo,setUserInfo} = useUserInfo();
  const [cfUser, setCfUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


const fetchUser = useCallback(async () => {
  if (!userInfo) {
    setError('用户信息未找到');
    return;
  }

  setIsLoading(true);
  setError(null);
  const controller = new AbortController(); // 创建AbortController

  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.info?handles=${encodeURIComponent(userInfo)}`, // 编码用户名 ✅
      { signal: controller.signal } // 绑定取消信号
    );

    // 处理竞态条件
    if (!controller.signal.aborted) { 
      if (response.data.status === 'OK' && response.data.result?.length > 0) {
        const userData = response.data.result[0];
        setCfUser({
          ...userData,
          // 添加类型安全转换
          rating: Number(userData.rating) || 0,
          lastOnlineTimeSeconds: Number(userData.lastOnlineTimeSeconds) || 0
        });
        setUserInfo(userData.handle);
      }
    }
  } catch (err) {
    if (!axios.isCancel(err)) {  // 排除取消请求的错误
      console.error('Failed to fetch user:', err);
      setError('Failed to fetch user data');
    }
  } finally {
    if (!controller.signal.aborted) {
      setIsLoading(false);
    }
  }
}, [userInfo]);  // 依赖项明确列出 ✅

  // 组件挂载时自动获取数据
useEffect(() => {
  if (userInfo) {   // 只有当userInfo存在时才发起请求
    fetchUser();
  }
}, [userInfo]);  // 监听userInfo变化 ✅
useEffect(() => {
  const controller = new AbortController();
  return () => controller.abort();  // 清理未完成请求
}, []);

useEffect(
  ()=> {
    renderHandle();
  },[cfUser]
)

const [handleColor1, setHandleColor1] = useState<string>('');
const [handleColor2, setHandleColor2] = useState<string>('');
const StyledHandle1 = styled.b`color: ${handleColor1};`
const StyledHandle2 = styled.b`color: ${handleColor2};`
const renderHandle = () => {
  console.log(cfUser);
  if(!cfUser) return ;
  if (cfUser.rating >= 4000) {
    setHandleColor1('red');setHandleColor2('black');
  } else if (cfUser.rating >= 3000) {
    setHandleColor1('black');setHandleColor2('red');
  } else if (cfUser.rating >= 2400) {
    setHandleColor1('red');setHandleColor2('red');
  } else if (cfUser.rating >= 2100) {
    setHandleColor1('orange');setHandleColor2('orange');
  } else if (cfUser.rating >= 1900) {
    setHandleColor1('purple');setHandleColor2('purple');
  } else if (cfUser.rating >= 1600) {
    setHandleColor1('blue');setHandleColor2('blue');
  } else if (cfUser.rating >= 1400) {
    setHandleColor1('deepskyblue');setHandleColor2('deepskyblue');
  } else if (cfUser.rating >= 1200) {
    setHandleColor1('green');setHandleColor2('green');
  } else {
    setHandleColor1('gray');setHandleColor2('gray');
  }
}
  return (
    <Card style={{ 
    width: 'fit-content',    // ✨ 关键修改点
    maxWidth: '90vw',        // 防止子元素过宽导致的溢出
    minWidth: '20vw',        // 可选：设置最小宽度避免收缩过小
    height: 'auto',
    overflow: 'auto',
    margin: '0 auto',
    marginTop: '3vw',
    display: 'block',        // （覆盖之前的 inline-block）
    boxSizing: 'border-box'     // 正确计算宽度
  }}
  bg={`${useTheme().theme.toLowerCase()}`} 
  key={`${useTheme().theme}`} 
  text={`${useTheme().theme}` === 'light' ? 'dark' : 'white'}>
      {isLoading && <div className="text-center p-3"><Spinner animation="border" /></div>}
      
      {error && (
        <div className="alert alert-danger m-3">
          {error}，请<a href="#" onClick={(e) => { e.preventDefault(); fetchUser(); }}>重试</a>
        </div>
      )}

      {cfUser && (
        <Container>
          <Row>
          <Col style={{paddingLeft:'0' ,alignContent: 'center', justifyContent: 'center'}}>
          <Card.Img src={cfUser.titlePhoto || '/fallback.jpg'} onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = '../../public/window.svg';}}
          style={{
            backgroundImage: `url('../../public/window.svg')`,
            backgroundSize: 'cover' ,
            transition: 'transform 0.3s ease, opacity 0.3s ease', // 新增过渡效果
            cursor: 'zoom-in',
            transformOrigin: 'center center',
            width: '100%',       // 强制宽度铺满容器
            height: '100%',      // 强制高度铺满容器
            objectFit: 'cover',  // 关键属性 (cover/contain)
            objectPosition: 'center center', // 居中裁切
          }}/>
          </Col>
          <Col>
          <Card.Body>
            <div style={{fontSize:'1.5em'}}>Your handle: <StyledHandle1>{cfUser.handle.substring(0,1)}</StyledHandle1><StyledHandle2>{cfUser.handle.substring(1)}</StyledHandle2></div>
            <Card.Text style={{whiteSpace:'nowrap'}}>
              <Row><Col>当前Rating/最大Rating: <b>{cfUser.rating || '暂无数据'}/{cfUser.maxRating || '暂无数据'}</b></Col></Row>
              <Row><Col>名字：{cfUser.firstName+' '+cfUser.lastName ||'暂无数据'}</Col></Row>
              <Row><Col>上次登录时间： {(new Date(cfUser!.lastOnlineTimeSeconds * 1000)).toLocaleString()}</Col></Row>
              <Row><Col>所属组织：{cfUser.organization||'暂无数据'}</Col></Row>
            </Card.Text>
            <Button variant={`${useTheme().theme}`} style={{border:'2px skyblue solid'}} onClick={fetchUser} disabled={isLoading}>{isLoading ? '更新中...' : '刷新数据'}</Button>
            <FortuneBtn />
          </Card.Body>
          </Col>
          </Row>
        </Container>
      )}
    </Card>
  );
};