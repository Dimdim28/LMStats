import { FC } from 'react';

import { InfoData } from '../../types/infoData';

type InfoProps = {
    data: InfoData[];
};

const Info: FC<InfoProps> = ({ data }) => {
    return (
        <div>
            {data.map((el) => {
                return (
                    <>
                        <h2 dangerouslySetInnerHTML={el.title}></h2>
                        <p dangerouslySetInnerHTML={el.description}></p>
                    </>
                );
            })}
        </div>
    );
};

export default Info;
