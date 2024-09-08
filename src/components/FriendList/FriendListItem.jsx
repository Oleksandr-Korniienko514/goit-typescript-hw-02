import PropTypes from 'prop-types';
import css from './FriendList.module.css'

const FriendListItem = ({ avatar, name, isOnline }) => {
    return (
        <ul>
            <li className={css.friend}>
                <div className={css.status} style={{ color: isOnline ? 'green' : 'red' }}>
                    {isOnline ? 'Online' : 'Offline'}
                </div>
                <img className={css.avatar} src={avatar} alt={name}
                    width="48" />
                <p className={css.name}>{name}</p>
            </li>
        </ul>
    );
};

FriendListItem.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isOnline: PropTypes.bool.isRequired,

};

export default FriendListItem;