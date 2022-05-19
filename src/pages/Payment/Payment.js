import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PRICE_DATA, PAYMENT_DATA } from "./PaymentData";
import { MAIN_URL, config } from "../../config";

const Payment = () => {
  const [paymentData, setPaymentData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const price = paymentData[0]?.price;
  const month = paymentData[0]?.month;
  const coupon = paymentData[0]?.discount_coupon;
  const discountPrice =
    price * parseFloat(`0.${100 - paymentData[0]?.discount_rate}`) - coupon;

  const handleCouponClick = () => {
    alert("이미 적용되었습니다.");
  };
  const handleBankClick = () => {
    alert("은행 점검시간(07:00 ~ 24:00)에는 이용하실 수 없습니다.");
  };

  const handlePointClick = () => {
    alert("사용가능한 포인트가 없습니다.");
  };

  const handlePayClick = () => {
    fetch(`${MAIN_URL}users/buy`, {
      method: "POST",
      body: JSON.stringify({ product_id: params.id }),
    }).then(res => {
      if (res.status === 201) {
        alert("구매 성공!");
        navigate("/mypage");
      } else {
        alert("이미 구매한 강의입니다.");
        navigate(`/products/private/${params.id}`);
      }
    });
  };

  useEffect(() => {
    fetch(`${config.list}/public/${params.id}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => setPaymentData(res.product));
  }, []);

  return (
    <Body>
      <PaymentWrap>
        <Header>
          <Title fontSize fontWeight>
            결제하기
          </Title>
          <Text fontSize="16px" fontWeight="900" color="#FF7129">
            암호화중
          </Text>
        </Header>

        <SectionWrap>
          <Section height="136px">
            <Title>주문 정보</Title>
            <Text fontSize="14px">{paymentData[0]?.content_name}</Text>
            <Img src={paymentData[0]?.thumb_img} />
          </Section>

          <Section height="136px">
            <Title>쿠폰</Title>
            <Div>
              <CouponInput value={coupon ? coupon?.toLocaleString() : "0"} />
              <Button
                onClick={handleCouponClick}
                width="80px"
                color="white"
                bgColor="black"
              >
                쿠폰 적용
              </Button>
            </Div>
          </Section>

          <Section height="136px">
            <Title>결제 금액</Title>

            {PRICE_DATA.map(price => {
              return (
                <Div key={price.id}>
                  <Text color="gray" gray fontSize="14px">
                    {price.title}
                  </Text>
                  <Text color="gray">
                    {price.id === 0
                      ? `${paymentData[0]?.price.toLocaleString()}원`
                      : `${(
                          paymentData[0]?.price - discountPrice
                        ).toLocaleString()}원`}
                  </Text>
                </Div>
              );
            })}
          </Section>

          <Section row>
            <Div>
              <Text margin="0 8px 0 0" fontSize="14px" fontWeight="700">
                최종 가격
              </Text>
              <Text color="gray" fontSize="12px">
                무이자 할부 가능
              </Text>
            </Div>
            <Div column>
              <Text margin="0 0 8px 0" color="gray" fontSize="11px">
                {paymentData[0]?.month}개월 할부 시 월
                {(discountPrice / month).toLocaleString()}원
              </Text>
              <Title fontSize="16px" fontWeight="700">
                {discountPrice.toLocaleString()}원
              </Title>
            </Div>
          </Section>

          <Section>
            <Title>결제 방식</Title>
            <Div marginTop>
              {PAYMENT_DATA.map(payment => {
                return (
                  <Div key={payment.id}>
                    <Button
                      onClick={handleBankClick}
                      border
                      bgColor="white"
                      margin
                      width="288px"
                    >
                      {payment.bank}
                    </Button>
                    <Button
                      onClick={handlePointClick}
                      border
                      bgColor="white"
                      margin
                      width="288px"
                    >
                      {payment.point}
                    </Button>
                  </Div>
                );
              })}
            </Div>
          </Section>
          <Button
            onClick={handlePayClick}
            fontWeight
            color="white"
            bgColor="#FF7129"
          >
            결제하기
          </Button>
        </SectionWrap>
      </PaymentWrap>
    </Body>
  );
};

const Body = styled.div`
  background-color: #f8f8f9;
`;
const PaymentWrap = styled.div`
  width: 640px;
  height: 1000px;
  margin: 0 auto;
  padding-top: 120px;
  padding-bottom: 100px;
  background-color: white;
`;

const SectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 24px;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 84px;
  padding: 24px;
  color: white;
  background-color: black;
`;

const Section = styled.section`
  width: 100%;
  height: ${props => props.height};
  display: flex;
  flex-direction: ${props => (props.row ? "row" : "column")};
  justify-content: space-between;
`;

const Div = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? "column" : "row")};
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => (props.marginTop ? "12px" : "0")};
`;

const Img = styled.img`
  width: 90px;
  height: 72px;
  border: 1px solid black;
`;

const Title = styled.h2`
  font-size: ${props => (props.fontSize ? "26px" : "20px")};
  font-weight: ${props => (props.fontWeight ? "700" : "900")};
`;

const Text = styled.span`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  margin: ${props => props.margin};
`;

const CouponInput = styled.input`
  width: 500px;
  padding: 13px 16px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: black;
  border: ${border => (border ? "1px solid lightgray" : "none")};
  width: ${props => props.width};
  height: 48px;
  font-size: 14px;
  font-weight: ${props => (props.fontWeight ? "700" : null)};
  margin: ${props => (props.margin ? "0 8px 8px 0" : "0")};
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
`;

export default Payment;
