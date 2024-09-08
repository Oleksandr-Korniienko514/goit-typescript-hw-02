import css from './Profile.module.css';

const Profile = ({ name, tag, location, image, stats }) => {
    return (
        <div className={css.profile}>
            <div className={css.user}>
                <img className={css.img}
                    src={image}
                    alt="User avatar"
                />
                <p className={css.name}>{name}</p>
                <p className={css.combined}>{tag}</p>
                <p className={css.combined}>{location}</p>
            </div>

            <ul className={css.stats}>
                <li>
                    <span className={css.label}>Followers</span>
                    <span className={css.quantity}>{stats.followers}</span>
                </li>
                <li>
                    <span className={css.label}>Views</span>
                    <span className={css.quantity}>{stats.views}</span>
                </li>
                <li>
                    <span className={css.label}>Likes</span>
                    <span className={css.quantity}>{stats.likes}</span>
                </li>
            </ul>
        </div>

    )
}

export default Profile