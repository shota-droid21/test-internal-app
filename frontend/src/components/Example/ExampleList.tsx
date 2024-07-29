import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    {
        text: "ISS第2事業部の体制図は？",
        value: "ISS第2事業部の体制図は？"
    },
    { text: "ISS2の教育カリキュラム？", value: "ISS2の教育カリキュラム？" },
    { text: "このアプリの問い合わせ先は？", value: "このアプリの問い合わせ先は？" }
];

interface Props {
    onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {EXAMPLES.map((x, i) => (
                <li key={i}>
                    <Example text={x.text} value={x.value} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
