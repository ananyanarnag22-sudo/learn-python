export default function StatsCard({title, value}: {title: string, value: string | number}){


    return (

        <div className="bg-white p-6 rounded-xl shadow">


            <p className="text-gray-500">
                {title}
            </p>


            <h2 className="text-3xl font-bold mt-2">
                {value}
            </h2>


        </div>

    )
}