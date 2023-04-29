import {IconPencil, IconTrash, IconExclamationCircle} from  '@tabler/icons-react'
import './ParameterItem.css'

const ParameterItem = ({item, index, handleInfo, handleDelete}) => {

    return (
        <div className='parentItem'>
            <div className='childItem'>
                This is an item {item[0]} 
            </div>
            <div className='itemButtons'>
                <button className='paramButton' onClick={() => handleInfo(item)}>
                    <IconPencil/>
                </button>
                <button className='paramButton' onClick={() => handleDelete(index)}>
                    <IconTrash/>
                </button>
                <button className='paramButton' onClick={() => handleInfo(item)}>
                    <IconExclamationCircle/>
                </button>
            </div>
        </div>
    )
}

export default ParameterItem