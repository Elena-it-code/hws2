import s from './Loader.module.css'
import loadingSvg from './loading.svg'; // Импортируем SVG-файл


export const Loader = () => {
    return (
        <div className={s.loader}>
            <img src={loadingSvg} alt="Loading" className={s.spinner} />
        </div>
    )
}
