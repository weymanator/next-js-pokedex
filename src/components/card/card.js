import clsx from "clsx";
import Image from "next/image";
import styles from './card.module.sass'
import Chip from "@/components/chip";

export default function Card({
    img,
    name,
    number,
    types,
    horizontal,
    actions,
    contentContainerClassNames,
    actionsContainerClassNames,
    floatingContainerClassNames,
    floatingIcon,
    onFloatingClicked,
}) {
    const containerClassNames = clsx(styles.container, { [styles['container--horizontal']]: horizontal }, contentContainerClassNames)
    const contentClassNames = clsx(styles.content, { [styles['content--horizontal']]: horizontal })
    const actionsClassNames = clsx(styles.row, actionsContainerClassNames)
    const floatingClassNames = clsx(styles.floating, floatingContainerClassNames)

    return (
        <div className={containerClassNames}>
            <div className={contentClassNames}>
                <Image src={img} width={146} height={138} alt={name} />
                <div className={styles.col}>
                    <div className={styles.row}>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.number}>{number}</span>
                    </div>
                    <div className={styles.row}>
                        {types.map(type => <Chip key={type} text={type} />)}
                    </div>
                    {!!actions && (
                        <div className={actionsClassNames}>
                            {actions}
                        </div>
                    )}
                </div>
            </div>
            {floatingIcon && (
                <div className={floatingClassNames} onClick={onFloatingClicked}>
                    <span class="material-icons">close</span>
                </div>
            )}
        </div>
    )
}