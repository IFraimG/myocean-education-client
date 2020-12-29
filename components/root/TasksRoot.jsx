import Link from "next/link"
import { CaretDownOutlined, FlagOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Dropdown, Menu, Button, List, Pagination, Row, Col } from "antd";
import { useState, useEffect } from "react";
import styles from "../../styles/pupil/root.module.scss";
import { useDispatch } from "react-redux";
import {getCurrentLessonsAction} from "../../store/actions/profile"

const SingleWork = ({workData}) => {
  let typeWork = ""
  let typeWorkText = ""

  switch(workData.type) {
    case "homework": {
      typeWork = <div className="work-logo homework-logo"></div>;
      typeWorkText = <p>Домашняя работа</p>
      break;
    }
    case "classwork": { 
      typeWork = <div className="work-logo classwork-logo"></div>;
      typeWorkText = <p>Классная работа</p>
      break;
    }
    case "hardwork": { 
      typeWork = <div className="work-logo hardwork-logo"></div>;
      typeWorkText = <p>Контрольная работа</p>
      break;
   }
    case "alertwork": { 
      typeWork = <div className="work-logo alert-logo"></div>;
      typeWorkText = <p>Важное сообщение</p>
      break;
  }
    case "vebinar": { 
      typeWork = <div className="work-logo vebinar-logo"></div>;
      typeWorkText = <p>Прямая трансляция</p>
      break;
  }
    default: break;
  }
  return (<>
      <div className={styles.root__date}>
        {typeWork}
        {workData.date}
      </div>
      <div>
        <Link href={"/courses" + workData.courseID}>{workData.title}</Link>
      </div>
      <div className={styles.root__text}>{typeWorkText}</div>
      <div className={styles.root__time}>
        <ClockCircleOutlined className={styles.root__time__logo} />
        <span>Сдача {workData.timeEnd}</span>
      </div>
        <Button className={styles.root__button} ghost type="primary">Завершить <FlagOutlined /></Button>
        <Button className={styles.root__smbutton} ghost type="primary"><FlagOutlined /></Button>
    </>
  )
}

function TasksRoot(props) {
  const [numPage, setNum] = useState(1)
  const [courseCurrent, setCourse] = useState(null)
  const dispatch = useDispatch()

  console.log(props);
  const getCurrentCourse = (courseID, title) => {
    dispatch(getCurrentLessonsAction(courseID))
    setCourse(title)
  }
  const setPageCourse = (current, pageSize) => setNum(current)

  return (
    <div>
      <Card className={styles.root} title="Задания" extra={
        props.profile.profile.courses?.length > 0 ? 
          <Dropdown overlay={
            <Menu>
              {props.profile.profile.courses.map((item, index) => {
                return <Menu.Item onClick={() => getCurrentCourse(item.courseID, item.title)} key={index}>{ item.title }</Menu.Item>
              })}
            </Menu>
          } placement="bottomCenter">
            <Button>
              <CaretDownOutlined />
              { courseCurrent == null ? <> Выбрать курс</> : courseCurrent }
            </Button>
        </Dropdown>
        : ""
      }>
          { props.profile.coursesList.length > 0 ? (
            <div className={styles.root__inner}>
              <div className={styles.root__tasklist}>
                { numPage <= 1 ? <SingleWork workData={props.profile.coursesList[0]} />
                  : <SingleWork workData={props.profile.coursesList[numPage]} />
                }
              </div>
              <Pagination className={styles.root__paginator} onChange={setPageCourse} defaultPageSize={1} total={props.profile.coursesList.length > 1 ? props.profile.coursesList.length - 1 : props.profile.coursesList.length}  />
            </div>
            )
          : <p>У вас нет невыполненных задач, отдыхайте !</p>
          }
      </Card>
    </div>
  );
}

export default TasksRoot;
