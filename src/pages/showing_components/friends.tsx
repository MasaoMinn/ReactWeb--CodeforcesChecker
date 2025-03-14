import { Button, Spinner, Table } from "react-bootstrap"
import styled, { css } from "styled-components"
import { useTheme } from "../../components/themeProvider"
import { useUserInfo } from "../../components/userProvider"
import { useState } from "react";

// 创建样式化的表格组件
const StyledTable = styled(Table)`
  th, td {
    text-align: center;     // 水平居中
    vertical-align: middle; // 垂直居中
  }
`;

// 增强型布局容器
const FStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 5vh auto;
`

export default () => {
  const { theme } = useTheme();
  const addButton = <Button variant={useTheme().theme} style={{width: '100%'}}><i className={"bi bi-plus-circle"+useTheme().theme=='dark'?'-fill':''}></i> Add</Button>
  const addInput = (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <input type="text" placeholder="username" />
      <Button variant={useTheme().theme}>Add</Button>
    </div>
  )
  const addLoading = (
    <Spinner animation="border" variant={useTheme().theme} />
  )
  const [addType,setAddType] =useState()
  return (
    <FStyle>
      <StyledTable striped bordered hover style={{ border: '2px solid rgb(39, 185, 6)' }} variant={theme}>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>rating</th>
            <th>lastOnlineTime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td colSpan={4} className="justify-content-center">
            <Button variant={theme} style={{ width: '100%', margin: '0 auto' }}>
              <i className={`bi bi-plus-circle${theme === 'dark' ? '-fill' : ''}`} />
              <span>Add</span>
            </Button>
            </td>
          </tr>
        </tbody>
      </StyledTable>
    </FStyle>
  )
}