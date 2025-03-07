//import { useUserInfo } from "@/components/userProvider";
import { useEffect,useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useTheme } from "./themeProvider";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { JSXSource } from "react/jsx-dev-runtime";
import { useUserInfo } from "./userProvider";
import calendar from 'chinese-calendar'
import {Row,Col} from 'react-bootstrap'

const fortuneStyles = [
    {
        color: '#0d0b0d',  // 玄黑（极致晦暗）
        border: '2px solid #2d3032', // 铁雾灰边线
        backgroundColor: '#1a161a'   // 夜岩黑背景
    },
    {
        color: '#423f3f',  // 砚台灰
        backgroundColor: '#dfe2e1', // 砾石灰底
        textShadow: '0 1px 1px rgba(255,255,255,0.15)'
    },
    {
        color: '#7b7b7e',  // 铁灰渐变
        background: 'linear-gradient(145deg, #e1e1e1 0%, #c5c5c5 100%)'
    },
    {
        color: '#3d3d3f',  // 玄素平衡色
        backgroundColor: '#f7f7ef'  // 素绢白
    },
    {
        color: '#64a982',  // 青竹色
        backgroundColor: '#f4fffa'  // 霜雾白底
    },
    {
        color: '#ff3860',  // 朱砂红（纯正朱红色）
        backgroundColor: '#fff5f5', // 浅妃色底
        border: '1px solid #ff7e79', // 珊瑚红边
        boxShadow: '0 2px 8px rgba(255,56,96,0.15)'
    },
    { 
        color: '#ffd700',  // 赤金色
        background: 'linear-gradient(45deg, #fff9ed 30%, #fff3db 90%)', 
        textShadow: '0 2px 4px rgba(255,215,0,0.3)'
    },
    {
        color: '#228b22',  // 翡翠绿
        backgroundColor: '#f4fbf3', // 水雾青
        border: '2px solid #5cd668', // 新生绿边
        boxShadow: '0 4px 12px rgba(92,214,104,0.2)'
    },
    {
        color: '#fff',  
        background: `linear-gradient(135deg, 
            #ff6b6b 0%, 
            #ff9f43 30%, 
            #feca57 55%, 
            #2ecc71 80%,
            #48dbfb 100%)`, // 五福四色渐变
        textShadow: '0 2px 4px rgba(0,0,0,0.15)'
    }
] as const; // 使用TS const断言确保样式严格性
function simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // 强制转换为 32 位整数
    }
    return hash<0?-hash:hash;
}
function FortuneTeller() {//根据日期和用户信息生成运势
    let user:string=useUserInfo().userInfo;
    const date=new Date();
    if(calendar.isHoliday(date.toDateString())) {//节假日fortune好
        return (
            <>
                <div style={fortuneStyles[7]}>
                    {calendar.getHolidayDetail(date.toDateString())[2]}快乐！
                </div>
            </>
        )
    }
    const var1:number=date.getDay()*date.getMonth();//与当日日期有关
    var var2:number=simpleHash(useUserInfo().userInfo);
    let fortune:number = (var1+var2)%9;
    if(fortune<0) fortune=-fortune;
    console.log(fortune);
    return (
        <Container>
            <Row style={{textAlign:'center'}}>
            <h3 style={fortuneStyles[fortune]}>
                今日运势：
                {fortune===0&&`至阴之厄，极致晦暗`}
                {fortune===1&&`困顿感如陷流沙`}
                {fortune===2&&`砚台灰，事事难,寒意彻骨的阻碍期`}
                {fortune===3&&`铁灰渐变，平淡无奇,基础稳但缺机缘`}
                {fortune===4&&`玄素平衡，平和安稳,中正安康平稳期`}
                {fortune===5&&`青竹色，事事顺利,吉祥如意的顺畅期`}
                {fortune===6&&`朱砂红,财运爆发的顶级丰盛 `}
                {fortune===7&&`赤金色，贵人相助的幸运期`}
                {fortune===8&&`翡翠绿，事事如意的顶级幸运期,天时地利人和的完美境界!`}
            </h3>
            </Row>
            
        </Container>
    )
}
export default () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [fortune, setFortune] = useState<JSXSource>();
    useEffect(()=>{
        
    },[]);

    return (<>
        <Button variant={useTheme().theme} onClick={handleShow} style={{border:'2px skyblue solid'}} disabled={show}>Launch</Button>
        <Offcanvas show={show} onHide={handleClose} placement="end" data-bs-theme={useTheme().theme}   style={{ width: 'min(90vw, 600px)',maxWidth: 'none'}}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <FortuneTeller />
            </Offcanvas.Body>
        </Offcanvas>
    </>)

}