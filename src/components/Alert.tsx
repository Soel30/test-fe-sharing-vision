import React from "react";

interface IAlertProps {
    children: React.ReactNode
    show?: boolean
}

const Alert = ({ children, show }: IAlertProps) => {

    const [showAlert, setShowAlert] = React.useState(show)

    const handleClose = () => {
        setShowAlert(false)
    }

    React.useEffect(() => {
        setShowAlert(show)
    }, [show])
    return (
        <div className="relative p-4 pr-12 pl-12 mb-4 text-white border border-red-300 border-solid rounded-lg bg-gradient-to-tl from-red-600 to-orange-600" style={{ display: showAlert ? 'block' : 'none' }}>
            {children}
            <button type="button" className="box-content absolute top-0 right-0 w-4 h-4 p-4 text-sm text-white bg-transparent border-0 rounded z-2" onClick={handleClose}>
                <span aria-hidden="true" className="text-center cursor-pointer">&#10005;</span>
            </button>
        </div>

    )
}

export default Alert