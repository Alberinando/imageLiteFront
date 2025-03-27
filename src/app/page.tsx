import Template from "@/components/template/Template";
import Link from "next/link";
import Button from "@/components/button/Button";

export default function Home() {
  return (
    <>
      <Template>
        <h1>Home</h1>
          <Link href="/galeria">
              <Button color="bg-blue-500 hover:bg-blue-300" label="Galeria" textColor="white" type="button" />
          </Link>
      </Template>
    </>
  );
}
