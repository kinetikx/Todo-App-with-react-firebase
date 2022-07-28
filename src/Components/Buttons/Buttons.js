import "./Buttons.css"
const Buttons = (props)=>{
    return(
        <button

            onClick={props.onClick}
            className="Button">
            {props.child}
kaydet
        </button>
    )
}
export default Buttons