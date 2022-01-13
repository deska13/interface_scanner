import React from 'react'

const ClientPremCalc = () => {
    const params = useParams()
    const [client, setClient] = useState({})
    const [PremCalcs, setPremCalcs] = useState([])
    const [fetchPremCalcsById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getClientPremCalcs(id)
        console.log(response)
        setClient(response.data.client)
        setPremCalcs(response.data.orders)
    }) 

    useEffect(() => {
        fetchPremCalcsById(params.id)
    }, [])

    return (
        <div>
            <h1>Заказы клиента № {params.id}</h1>
            <hr style={{margin: '15px 0'}} />
            {
                isLoading
                ? <Loader />
                : <div>
                    <h2>
                        Клиент: {client.surname} {client.name} {client.patronymic}
                    </h2>
                    <hr style={{margin: '15px 0'}} />
                    
                </div>
            }
        </div>
    )
}

export default ClientPremCalc
