
import Layout from "../../Components/Layout";
import Welcome from "../../Components/Welcome";

export default function index() {
  return (
    <Layout>
      
        <div className="min-w-max">
        <img className="h-96 w-[]" src="../../../public/inicioalberca.webp" alt="" />
        </div>
          <Welcome/>
      
    </Layout>
  )
}
