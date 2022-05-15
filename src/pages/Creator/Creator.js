import React, { useState } from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

const Creator = () => {
  const [creatorUserInfo, setCreatorUserInfo] = useState([
    {
      nickname: "",
      email: "",
      phone_number: "",
      introduction: "",
      carrer: "",
    },
  ]);
  const [classInfo, setClassInfo] = useState([{}]);

  const [mainCategory, setMainCategory] = useState();

  const handleCreatorInfo = ({ target }) => {
    setCreatorUserInfo([
      { ...creatorUserInfo[0], [target.name]: target.value },
    ]);
  };

  const handleCreatorProduct = ({ target }) => {
    setClassInfo([{ ...classInfo[0], [target.name]: target.value }]);
  };

  const handleImgInput = e => {
    setCreatorUserInfo([
      { ...creatorUserInfo[0], image: URL.createObjectURL(e.target.files[0]) },
    ]);
  };

  const mainCategorySelector = e => {
    setMainCategory(e.target.value);
    setClassInfo([{ ...classInfo[0], category2: e.target.value }]);
  };

  const subCategorySelector = e => {
    setClassInfo([{ ...classInfo[0], category: e.target.value }]);
  };

  const showSubCategory = () => {
    switch (mainCategory) {
      case "투자":
        return (
          <SubCategorySelectBox onChange={subCategorySelector}>
            {SUB_CATEGORY_INVESTMENT.map(product => {
              return (
                <SubCategoryOption key={product.id} value={product.value}>
                  {product.value}
                </SubCategoryOption>
              );
            })}
          </SubCategorySelectBox>
        );
      case "Life":
        return (
          <SubCategorySelectBox onChange={subCategorySelector}>
            {SUB_CATEGORY_LIFE.map(product => {
              return (
                <SubCategoryOption key={product.id} value={product.value}>
                  {product.value}
                </SubCategoryOption>
              );
            })}
          </SubCategorySelectBox>
        );
      case "프로그래밍":
        return (
          <SubCategorySelectBox onChange={subCategorySelector}>
            {SUB_CATEGORY_PROGRAMING.map(product => {
              return (
                <SubCategoryOption key={product.id} value={product.value}>
                  {product.value}
                </SubCategoryOption>
              );
            })}
          </SubCategorySelectBox>
        );
      case "음식":
        return (
          <SubCategorySelectBox onChange={subCategorySelector}>
            {SUB_CATEGORY_FOOD.map(product => {
              return (
                <SubCategoryOption key={product.id} value={product.value}>
                  {product.value}
                </SubCategoryOption>
              );
            })}
          </SubCategorySelectBox>
        );
      case "지식":
        return (
          <SubCategorySelectBox onChange={subCategorySelector}>
            {SUB_CATEGORY_KNOWLEDGE.map(product => {
              return (
                <SubCategoryOption key={product.id} value={product.value}>
                  {product.value}
                </SubCategoryOption>
              );
            })}
          </SubCategorySelectBox>
        );
      default:
        return;
    }
  };

  const inputValueCheck = e => {
    e.preventDefault();
    fetch("http://10.58.3.183:8000/users/creator", {
      method: "POST",
      body: JSON.stringify({
        nickname: creatorUserInfo[0].nickname,
        email: creatorUserInfo[0].email,
        img: "a",
        phone_number: creatorUserInfo[0].phone_number,
        introduction: creatorUserInfo[0].introduction,
        carrer: creatorUserInfo[0].carrer,
      }),
    });
  };

  return (
    <Wrapper>
      <TabMenus>
        {TAB_MENU.map(menu => {
          return (
            <Link key={menu.id} to={String(menu.id)} spy={true} smooth={true}>
              <TabMenu>{menu.title}</TabMenu>
            </Link>
          );
        })}
      </TabMenus>
      <CreatorMain>
        <AboutProduct onSubmit={inputValueCheck}>
          <ProductTitle>크리에이터님과 클래스에 대해서 알려주세요</ProductTitle>
          <AboutProductText>
            언젠가 이런 걸 가르쳐봐야지 생각해본 적이 있으신가요?
          </AboutProductText>
          {CREATOR_INFO_INPUT.map(creator => {
            return (
              <CreatorInfoBox
                key={creator.id}
                borderBottom={creator.border}
                name={creator.dataId}
                paddingTop={creator.paddingTop}
              >
                <CreatorInfo>{creator.title}</CreatorInfo>
                <CreatorInfoInput
                  type={creator.type}
                  placeholder={creator.placeHolder}
                  onChange={handleCreatorInfo}
                  name={creator.name}
                />
              </CreatorInfoBox>
            );
          })}
          <CategoryBox>
            <CategoryTitle name="2">카테고리</CategoryTitle>
            <MainCategorySelectBox onChange={mainCategorySelector}>
              {MAIN_CATEGORY.map(product => {
                return (
                  <MainCategoryOption key={product.id} value={product.name}>
                    {product.value}
                  </MainCategoryOption>
                );
              })}
            </MainCategorySelectBox>
            {showSubCategory()}
          </CategoryBox>
          {CREATOR_PRODUCT_INPUT.map(product => {
            return (
              <CreatorProductInfoBox
                key={product.id}
                borderBottom={product.border}
                name={product.dataId}
                paddingTop={product.paddingTop}
              >
                <CreatorProductInfo>{product.title}</CreatorProductInfo>
                <CreatorProductInfoInput
                  type={product.type}
                  onChange={handleCreatorProduct}
                  placeholder={product.placeHolder}
                  name={product.name}
                />
              </CreatorProductInfoBox>
            );
          })}
          <ProductImgInfo>커버이미지</ProductImgInfo>
          <ProductImgInfoInput
            type="file"
            accept="image/*"
            name="coverImg"
            onChange={handleImgInput}
          />
          {creatorUserInfo[0].image && (
            <ProductImgPreview
              src={creatorUserInfo[0].image ? creatorUserInfo[0].image : null}
            />
          )}
          <ProductSubmitBtn>등록하기</ProductSubmitBtn>
        </AboutProduct>
      </CreatorMain>
    </Wrapper>
  );
};

export default Creator;

const ProductImgPreview = styled.img`
  width: 100%;
  height: 300px;
  margin-bottom: 30px;
`;

const ProductImgInfo = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const ProductImgInfoInput = styled.input`
  border: 1px solid lightgray;
  width: 100%;
  padding: 8px 0 8px 12px;
  margin-bottom: 30px;
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
  padding-top: 150px;
  margin-bottom: 150px;
`;

const CreatorMain = styled.div`
  width: 50%;
  margin-left: 200px;
`;

const TabMenus = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 30px;
  top: 180px;
  padding: 10px 0;

  > a {
    margin-bottom: 30px;
  }
`;

const TabMenu = styled.span`
  color: rgb(162, 162, 162);
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
`;

const AboutProduct = styled.form``;

const ProductTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const AboutProductText = styled.p`
  font-size: 25px;
  margin-bottom: 30px;
`;

const CreatorInfoBox = styled.div`
  border-bottom: ${props => props.borderBottom};
  margin-bottom: 30px;
  padding-top: ${props => props.paddingTop};
`;

const CreatorInfo = styled.h2`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
`;

const CreatorInfoInput = styled.input`
  margin-bottom: 30px;
  width: 100%;
  padding: 12px 0;
  border: 1px solid lightgray;
  padding-left: 16px;
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  margin-bottom: 30px;
`;

const CategoryTitle = styled.span`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
  padding-top: 150px;
`;

const MainCategorySelectBox = styled.select`
  margin-bottom: 30px;
  width: 100%;
  padding: 5px 0 5px 16px;
  border: 1px solid lightgray;
  outline: none;
`;

const MainCategoryOption = styled.option``;

const SubCategorySelectBox = styled.select`
  margin-bottom: 30px;
  width: 100%;
  padding: 5px 0 5px 16px;
  border: 1px solid lightgray;
  outline: none;
`;

const SubCategoryOption = styled.option``;

const CreatorProductInfoBox = styled.div`
  margin-bottom: 30px;
  padding-top: ${props => props.paddingTop};
`;

const CreatorProductInfo = styled.h2`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
`;

const CreatorProductInfoInput = styled.input`
  margin-bottom: 30px;
  width: 100%;
  padding: 12px 0 12px 12px;
  border: 1px solid lightgray;
`;

const ProductSubmitBtn = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-bottom: -50px;
`;

const CREATOR_INFO_INPUT = [
  {
    id: 1,
    title: "크리에이터 닉네임",
    type: "text",
    placeHolder: "사용할 닉네임을 적어주세요",
    name: "nickname",
    dataId: 1,
    paddingTop: "180px",
  },
  {
    id: 2,
    title: "이메일",
    type: "email",
    placeHolder: "이메일을 입력해주세요",
    name: "email",
  },
  {
    id: 3,
    title: "연락처",
    type: "tel",
    placeHolder: "연락처를 입력해주세요",
    name: "phone_number",
  },
  {
    id: 4,
    title: "간단 소개",
    type: "text",
    placeHolder: "간단하게 소개글을 입력해주세요",
    name: "introduction",
  },
  {
    id: 5,
    title: "경력",
    type: "text",
    placeHolder: "경력을 입력해주세요",
    border: "1px solid lightgray",
    name: "carrer",
  },
];

const CREATOR_PRODUCT_INPUT = [
  {
    id: 1,
    title: "클래스명",
    type: "text",
    dataId: 3,
    paddingTop: "160px",
    placeHolder: "클래스명을 적어주세요",
    name: "className",
  },
  {
    id: 2,
    title: "클래스 간단 소개",
    type: "text",
    placeHolder: "클래스에 대해 소개해주세요",
    name: "classInfo",
  },
  {
    id: 3,
    title: "클래스 가격",
    type: "number",
    placeHolder: "클래스 가격을 적어주세요",
    name: "classPrice",
  },
  {
    id: 4,
    title: "업로드 기간",
    type: "number",
    placeHolder: "업로드 기간을 적어주세요",
    name: "uploadMonth",
  },
];
const TAB_MENU = [
  {
    id: 1,
    title: "크리에이터 소개",
  },
  {
    id: 2,
    title: "강의 카테고리",
  },
  {
    id: 3,
    title: "클래스 소개",
  },
];

const MAIN_CATEGORY = [
  {
    id: 1,
    value: "1차 카테고리 선택",
  },
  {
    id: 2,
    value: "투자",
  },
  {
    id: 3,
    value: "Life",
  },
  {
    id: 4,
    value: "프로그래밍",
  },
  {
    id: 5,
    value: "음식",
  },
  {
    id: 6,
    value: "지식",
  },
];

const SUB_CATEGORY_INVESTMENT = [
  {
    id: 1,
    categoryValue: "투자",
    value: "2차 카테고리 선택",
  },
  {
    id: 2,
    categoryValue: "투자",
    value: "주식",
  },
  {
    id: 3,
    categoryValue: "투자",
    value: "부동산",
  },
  {
    id: 4,
    categoryValue: "투자",
    value: "경제",
  },
];

const SUB_CATEGORY_LIFE = [
  {
    id: 1,
    value: "2차 카테고리 선택",
  },
  {
    id: 2,
    value: "운동",
  },
  {
    id: 3,
    value: "취미",
  },
];

const SUB_CATEGORY_PROGRAMING = [
  {
    id: 1,
    value: "2차 카테고리 선택",
  },
  {
    id: 2,
    value: "리액트",
  },
  {
    id: 3,
    value: "파이썬",
  },
  {
    id: 4,
    value: "장고",
  },
];

const SUB_CATEGORY_FOOD = [
  {
    id: 1,
    value: "2차 카테고리 선택",
  },
  {
    id: 2,
    value: "자취용",
  },
  {
    id: 3,
    value: "손님용",
  },
];

const SUB_CATEGORY_KNOWLEDGE = [
  {
    id: 1,
    value: "2차 카테고리 선택",
  },
  {
    id: 2,
    value: "회사꿀팁",
  },
  {
    id: 3,
    value: "악기",
  },
];
