import "./style.css"
const RulesBlock = () =>{
    return (
        <div className={"rules-block-container"}>
            <h2>ПРАВИЛА: </h2>
            <h3>ГАРАНТИРОВАННЫЙ ВЫИГРЫШ</h3>
            <ol>
                <li>Лонгслив / футболка / сумка</li>
                <li>Стикерпак / зин / постер</li>
                <li>Проходка на ивент / фри кофе</li>
            </ol>
            <div className={"footer"}>
                <span>купить спины</span><br/>
                <span>можно тут <img src={"/casino/rules-arrow.svg"}/></span>
                <a className={"tg"} target="_blank" href={"https://t.me/radiovoronka/83"}>ТГ</a>
            </div>
        </div>
    )
}

export default RulesBlock