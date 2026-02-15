import Link from "next/link";
import { styles } from "@/app/lib/theme";
import SuccessToast from "./SuccessToast";

type Props = {
  title: string;
  addHref: string;
  addLabel: string;
  msg?: string | null;
  entityName: string;
  children: React.ReactNode;
};

export default function ListPageLayout({ title, addHref, addLabel, msg, entityName, children }: Props) {
  return (
    <div style={styles.pageCard()}>
      <SuccessToast msg={msg} entityName={entityName} />
      <div style={styles.pageHeader()}>
        <h2 style={styles.title()}>{title}</h2>
        <Link href={addHref}>
          <button style={styles.addButton()}>+ {addLabel}</button>
        </Link>
      </div>
      {children}
    </div>
  );
}
