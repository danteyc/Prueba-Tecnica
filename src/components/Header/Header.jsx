import { Input } from 'antd';
import { SearchOutlined,BellOutlined } from '@ant-design/icons';
import "./Header.scss"

export function Header(){
    return(
        <header>
            <div className="container cnt-header">
                <div className="search">
                    <Input placeholder="Buscar" prefix={<SearchOutlined/>}/>
                </div>
                <div className="notification">
                    <BellOutlined />
                </div>
            </div>
        </header>
    )
}