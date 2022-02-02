import firebase from "firebase/compat"

export function converSnaps<T>(results: firebase.firestore.QuerySnapshot<unknown>){
  return <T[]> results.docs.map(snap =>{
    return {
      id: snap.id,
      ...<any>snap.data()
    }
  })
}

export function converSnap<T>(snap: firebase.firestore.DocumentSnapshot<unknown>){
    return {
      id:snap.id,
      ...<any>snap.data()
    }
}
