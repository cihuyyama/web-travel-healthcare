import { redirect } from "next/navigation";


export default function Home() {

  if(true){
    redirect('/auth')
  }

  return (
    <main>
    </main>
  );
}
