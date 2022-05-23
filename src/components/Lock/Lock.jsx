import React from "react";

const Lock = ({
  lock,
  openLockOnServer,
  changeCommentOnServer,
  isShowEditInput,
  setisShowEditInput,
  setCommentInputComponent,
}) => {
  return (
    <>
      {lock.length !== 0 ? (
        <div>
          <span> NUMBER - {lock.floor}</span>
          {isShowEditInput ? (
            <div>
              <input
                onChange={(e) => setCommentInputComponent(e.target.value)}
                type="text"
                placeholder="ENTER THE COMMENT"
              />
              <button onClick={changeCommentOnServer}>SAVE COMMENT</button>
              <button onClick={() => setisShowEditInput(false)}>CANCEL</button>
            </div>
          ) : (
            <div>
              <span>COMMENT - {lock.floor}</span>
              <button onClick={() => setisShowEditInput(true)}>
                EDIT COMMENT
              </button>
            </div>
          )}
          <div>
            <span>STATUS - CLOSED</span>
            <button onClick={openLockOnServer}>OPEN LOCK</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Lock;
