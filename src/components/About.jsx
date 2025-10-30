import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { Container, Row, Col, Tab, Tabs, Card, Accordion } from 'react-bootstrap';

export default function About() {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            style={{
                backgroundColor: theme.backgroundColor,
                color: theme.color,
                minHeight: '100vh',
                paddingTop: '2rem'
            }}
        >
            <Container>
                {/* Header */}
                <Row className="mb-5">
                    <Col>
                        <div className="text-center">
                            <h1
                                className="display-4 fw-bold mb-3"
                                style={{ color: theme.headerColor }}
                            >
                                🌺 About hman's Orchid Collection 🌺
                            </h1>
                            <p
                                className="lead"
                                style={{ color: theme.cardText }}
                            >
                                Discover the beauty and diversity of our carefully curated orchid species
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Tabs Section */}
                <Row className="mb-5">
                    <Col>
                        <Tabs
                            defaultActiveKey="overview"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="overview" title="🌸 Overview">
                                <Card
                                    className="border-0 shadow-sm"
                                    style={{ backgroundColor: theme.cardBackground }}
                                >
                                    <Card.Body>
                                        <h4 style={{ color: theme.headerColor }}>Welcome to Our Orchid World</h4>
                                        <p style={{ color: theme.cardText, lineHeight: '1.8' }}>
                                            Our orchid collection features over 16 stunning species from around the world.
                                            Each orchid has been carefully selected for its unique beauty, rarity, and
                                            cultural significance. From the vibrant Cattleya to the delicate Phalaenopsis,
                                            our collection represents the incredible diversity of the orchid family.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Tab>

                            <Tab eventKey="mission" title="🎯 Mission">
                                <Card
                                    className="border-0 shadow-sm"
                                    style={{ backgroundColor: theme.cardBackground }}
                                >
                                    <Card.Body>
                                        <h4 style={{ color: theme.headerColor }}>Our Mission</h4>
                                        <p style={{ color: theme.cardText, lineHeight: '1.8' }}>
                                            We are dedicated to preserving and showcasing the natural beauty of orchids
                                            while educating enthusiasts about proper care and conservation. Our mission
                                            is to inspire a deeper appreciation for these magnificent flowers and promote
                                            sustainable growing practices.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Tab>

                            <Tab eventKey="collection" title="🏆 Collection">
                                <Card
                                    className="border-0 shadow-sm"
                                    style={{ backgroundColor: theme.cardBackground }}
                                >
                                    <Card.Body>
                                        <h4 style={{ color: theme.headerColor }}>Collection Highlights</h4>
                                        <ul style={{ color: theme.cardText, lineHeight: '1.8' }}>
                                            <li><strong>16 Unique Species</strong> - Carefully curated from around the world</li>
                                            <li><strong>Natural & Hybrid Varieties</strong> - Both wild and cultivated specimens</li>
                                            <li><strong>Award-Winning Specimens</strong> - Many with high ratings and recognition</li>
                                            <li><strong>Educational Resources</strong> - Detailed care instructions and history</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>

                {/* FAQ Accordion */}
                <Row>
                    <Col>
                        <h3 className="mb-4" style={{ color: theme.headerColor }}>
                            ❓ Frequently Asked Questions
                        </h3>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>How do I care for orchids?</Accordion.Header>
                                <Accordion.Body style={{ color: theme.cardText, backgroundColor: theme.cardBackground }}>
                                    Orchids require specific care including proper lighting (bright, indirect light),
                                    appropriate watering (weekly with good drainage), and proper humidity levels.
                                    Each species has unique requirements which you can find in our detailed guides.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>What makes an orchid "special"?</Accordion.Header>
                                <Accordion.Body style={{ color: theme.cardText, backgroundColor: theme.cardBackground }}>
                                    Special orchids in our collection are those with unique characteristics such as
                                    rare colors, exceptional size, award-winning genetics, or cultural significance.
                                    These specimens often require extra care and attention.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Are natural orchids better than hybrids?</Accordion.Header>
                                <Accordion.Body style={{ color: theme.cardText, backgroundColor: theme.cardBackground }}>
                                    Both natural and hybrid orchids have their own beauty and value. Natural orchids
                                    preserve genetic diversity and represent evolutionary perfection, while hybrids
                                    often offer enhanced colors, longer blooming periods, and easier care.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Can I visit your collection?</Accordion.Header>
                                <Accordion.Body style={{ color: theme.cardText, backgroundColor: theme.cardBackground }}>
                                    Yes! We offer guided tours of our orchid greenhouse by appointment.
                                    Please contact us through our contact page to schedule a visit.
                                    We also host special events during blooming seasons.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}