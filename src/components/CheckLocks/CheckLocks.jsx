import React, { useRef, useState } from "react";
import Lock from "../Lock/Lock";

const CheckLocks = () => {
  let [lock, setLock] = useState([]);
  let [commentInputComponent, setCommentInputComponent] = useState("");
  let [isShowEditInput, setisShowEditInput] = useState(false);
  let lockInput = useRef();

  let dataForChangeStatus = {
    ...lock,
    floor: 333,
    // state: opened,
  };

  let dataForChangeComment = {
    ...lock,
    floor: commentInputComponent,
    // comment: commentInputComponent,
  };

  let checkLockOnServer = (lockNumber) =>
    fetch(
      `https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`
    );

  let searchLock = async () => {
    try {
      if (lockInput.current.value !== "") {
        let result = await checkLockOnServer(lockInput.current.value);
        let json = await result.json();

        setLock(json);

        lockInput.current.value = "";
      }
    } catch (error) {
      console.error("error-" + error);
    }
  };

  let requestForLockonServer = (lockNumber, data) => {
    return fetch(
      `https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/${lockNumber}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbWFsa2FsYW5kYXJvdkBnbWFpbC5jb20iLCJpZCI6IjYxMDJiOWMxMmFhYTkwMGMwZTI2OGFkZSIsImV4cCI6MTY1NzMxNTM1NSwiaWF0IjoxNjUyMTMxMzU1fQ.c62OU82mCuRHxOZDMDyXaKhm3LYXS7kvywUXXfiMH2M`,
        },
      }
    );
  };

  let openLockOnServer = async () => {
    try {
      let result = await requestForLockonServer(lock.id, dataForChangeStatus);
      let json = await result.json();

      console.log("Success:", JSON.stringify(json));

      setLock(json);
    } catch (error) {
      console.error("error-" + error);
    }
  };

  let changeCommentOnServer = async () => {
    try {
      let result = await requestForLockonServer(lock.id, dataForChangeComment);
      let json = await result.json();

      console.log("Success:", JSON.stringify(json));

      setLock(json);

      setisShowEditInput(false);
    } catch (error) {
      console.error("error-" + error);
    }
  };

  return (
    <div>
      <h4>CHECK LOCK</h4>
      <div>
        <input ref={lockInput} type="text" placeholder="ENTER THE NUMBER" />
        <button onClick={searchLock}>SEARCH</button>
      </div>
      <Lock
        lock={lock}
        openLockOnServer={openLockOnServer}
        changeCommentOnServer={changeCommentOnServer}
        setCommentInputComponent={setCommentInputComponent}
        isShowEditInput={isShowEditInput}
        setisShowEditInput={setisShowEditInput}
      />
    </div>
  );
};

export default CheckLocks;
