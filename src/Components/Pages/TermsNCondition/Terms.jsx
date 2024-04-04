import { StyledFlex } from '../../../UI/StyledTags';
import classes from './Terms.module.css';

const Terms = ({ onAccept, onReject }) => {
  return (
    <div className={classes.backdrop}>
      <div className={classes.termsContent}>
        <h1>Terms and conditions</h1>
        <p>
          I understand that this declaration shall form the basis of the
          contract of insurance between me and Edelweiss General Insurance Co.
          Ltd. If, after issuance of an insurance policy basis the corresponding
          proposal and this declaration form, it is found that any of the
          statements, answers or details are incorrect or untrue in any respect
          whatsoever, Edelweiss General Insurance Co. Ltd. shall be at liberty
          to decide on any claim(s) filed in relation to and benefits pertaining
          to the said insurance policy. Further, I agree that in such scenario,
          the premium paid by me towards the issuance of the said insurance
          policy shall stand forfeited by Edelweiss General Insurance Co. Ltd.
        </p>
        <StyledFlex>
          <button onClick={onAccept}>Accept</button>
          <button onClick={onReject}>Reject</button>
        </StyledFlex>
      </div>
    </div>
  );
};

export default Terms;
