export default function TabButton({ children, onSelect}) {
    return(
        <ul>
            <div onClick={onSelect}>{children}</div>
        </ul>
    )
}