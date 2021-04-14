import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './ContactCard.module.css';
import defaultImg from '../../../img/default-user.jpg';

const ContactCard = ({ members }) => {
  const { memberId } = useParams();
  const { imgUrl, title, name, descr } = members.find(
    member => member.id === Number.parseInt(memberId),
  );
  return (
    <div className={`${s.onePersonContainer} ${s.container}`}>
      <hr className={s.personLine} />
      <div className={s.onePerson}>
        <Suspense
          fallback={
            <img src={defaultImg} alt={name} className={s.onePersonPhoto} />
          }
        >
          <img
            src={imgUrl ?? defaultImg}
            alt={name}
            className={s.onePersonPhoto}
          />
        </Suspense>

        <div className={s.aboutOnePerson}>
          <p className={s.onePersonName}>{name}</p>
          <p className={s.onePersonPosition}>{title}</p>
          <p className={s.onePersonText}>{descr}</p>
        </div>
      </div>
    </div>
  );
};
export default ContactCard;

ContactCard.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object),
};
