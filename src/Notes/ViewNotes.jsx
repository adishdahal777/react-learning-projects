import { useEffect, useState } from "react";
import { collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "../Firebase/FireSdk";
import FeaturedCard from "../Components/FeaturedCard";
import { Icon } from "@iconify/react";

export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [loader, setLoader] = useState(true);
  const fetchPost = async () => {
    await getDocs(collection(db, "notes")).then((querySnapshot) => {
      const newData = querySnapshot.docs
        .filter((doc) => doc.data().userid === auth.currentUser.uid)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

      setNotes(newData);
      setLoader(false);
    });
  };
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {loader ? (
        <div className="h-[20vh] w-full container grid place-content-center">
          <Icon icon="lucide:loader" width={20} className="ml-3 animate-spin" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          {notes.map((item, index) => (
            <FeaturedCard
              key={index}
              title={item.title}
              desc={item.desc}
              type={item.type}
              id={item.id}
            />
          ))}
        </div>
      )}
    </>
  );
}
