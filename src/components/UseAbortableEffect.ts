import { useEffect } from "react";

const useAbortableEffect = (effect: any, dependencies: any) => {
  let aborted = false; // mutable status object
  useEffect(() => {
    aborted = false;
    // pass the mutable object to the effect callback
    // store the returned value for cleanup
    const cleanUpFn = effect(aborted);
    return () => {
      // mutate the object to signal the consumer
      // this effect is cleaning up
      aborted = true;
      if (typeof cleanUpFn === "function") {
        // run the cleanup function
        cleanUpFn();
      }
    };
  }, [...dependencies]);
};

export default useAbortableEffect;
