import Layout from "@/components/Layout";

interface User {
    id: number;
    name: String;
    email: String;
    phone: String;
    website: String;
}
interface UserDetailProps {
    user: User;
}
export default function UserDetail(props: UserDetailProps) {
    const { user } = props;
    return (
        <Layout pageTitle={"User Detail"}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.website}</p>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const dataUsers = await res.json();
    const paths = dataUsers.map((user: User) => ({
        params: {
            id: `${user.id}`,
        },
    }));
    return {
        paths,
        fallback: false,
    };
}

interface GetStaticProps {
    params: {
        id: String;
    }
}
export async function getStaticProps(context: GetStaticProps) {
    const { id } = context.params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await res.json();
    return {
        props: {
            user,
        },
    };
}
