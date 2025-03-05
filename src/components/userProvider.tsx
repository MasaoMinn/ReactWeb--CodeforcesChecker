import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
  } from 'react';
  
  // 定义上下文类型
  type UserContextType = {
    userInfo: string;
    setUserInfo: (value: string) => void;
  };
  
  // 创建上下文（默认值需要保持一致的类型结构）
  const UserContext = createContext<UserContextType | undefined>(undefined);
  
  // 自定义Hook组件
  export const useUserInfo = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('必须在UserInfoProvider中使用useUserInfo');
    }
    return context;
  };
  
  // Provider组件
  export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
    // 支持SSR的安全初始化（处理初始化阶段可能无法访问localStorage）
    const initializeUserInfo = () => {
      try {
        // 仅在浏览器环境下访问localStorage
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('userInfo');
          return stored ? stored : 'Sunny_ZY';
        }
        return 'Sunny_ZY';
      } catch (error) {
        console.error('访问localStorage失败:', error);
        return 'Sunny_ZY';
      }
    };
  
    // 状态管理（带有类型标注）
    const [userInfo, setUserState] = useState<string>(initializeUserInfo);
  
    // 状态更新方法（同步到localStorage）
    const setUserInfo = (value: string) => {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('userInfo', value);
        }
        setUserState(value);
      } catch (error) {
        console.error('保存到localStorage失败:', error);
      }
    };
  
    // 初始化同步（处理localStorage外部变更）
    useEffect(() => {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'userInfo') {
          setUserState(e.newValue || 'Sunny_ZY');
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
  
    return (
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
      </UserContext.Provider>
    );
  };